#!/bin/bash

# Define the maximum width for resizing
MAX_WIDTH=1920

# Define the target file size in bytes (800KB = 800 * 1024 bytes)
TARGET_SIZE_BYTES=$((800 * 1024))

# Define JPEG quality settings
JPEG_QUALITY_DEFAULT=85  # Default quality for images already below target or for moderate optimization
JPEG_QUALITY_STEP=5      # How much to decrease quality by in each iteration when above target
JPEG_QUALITY_MIN=50      # Minimum acceptable JPEG quality (can go lower, but visual quality degrades fast)

# Define PNG quality settings (influences compression, color reduction for smaller sizes)
PNG_QUALITY_LARGE_FILE=75 # More aggressive quality for large PNGs (can be lossy for PNGs)
PNG_QUALITY_SMALL_FILE=85 # Standard quality for smaller PNGs

# --- Helper function for human-readable byte sizes ---
# Checks if numfmt is available and uses it, otherwise prints raw bytes.
# Using 'iec-i' as it's widely supported for base-1024 K/M/G.
# On macOS with Homebrew, numfmt is often installed as gnumfmt.
format_bytes() {
    local bytes=$1
    if command -v numfmt &> /dev/null; then
        numfmt --to=iec-i "$bytes"  # Changed from iec-bytes to iec-i
    elif command -v gnumfmt &> /dev/null; then # For macOS Homebrew users
        gnumfmt --to=iec-i "$bytes" # Changed from iec-bytes to iec-i
    else
        echo "${bytes} bytes"
    fi
}

# Find all image files (jpg, jpeg, png, gif, bmp) recursively and process them
# -print0 is crucial for handling filenames with spaces or special characters
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" \) -print0 | while IFS= read -r -d $'\0' image_path; do
    echo "Processing: $image_path"

    # Get initial file size for comparison
    # Use stat -c%s for Linux and stat -f%z for macOS compatibility
    initial_size=$(stat -c%s "$image_path" 2>/dev/null || stat -f%z "$image_path" 2>/dev/null)
    if [ -z "$initial_size" ]; then
        echo "Error: Could not get initial file size for $image_path. Skipping."
        echo "---"
        continue
    fi
    echo "Initial size: $(format_bytes $initial_size)"

    # --- Step 1: Resize if necessary ---
    current_width=$(identify -format "%w" "$image_path" 2>/dev/null)
    if [ -z "$current_width" ]; then
        echo "Error: Could not identify width for $image_path. Skipping optimization."
        echo "---"
        continue
    fi

    if (( current_width > MAX_WIDTH )); then
        echo "Resizing: $image_path (Current width: ${current_width}px)"
        # Resize the image, maintaining aspect ratio and original format
        mogrify -resize "${MAX_WIDTH}x>" "$image_path"
        echo "Resized: $image_path to maximum width of ${MAX_WIDTH}px"
        # Update initial_size after resize, as it might have changed significantly
        initial_size=$(stat -c%s "$image_path" 2>/dev/null || stat -f%z "$image_path" 2>/dev/null)
        echo "Size after resize: $(format_bytes $initial_size)"
    else
        echo "Skipping width resize for: $image_path (Width ${current_width}px is already within limits)"
    fi

    # --- Step 2: Optimize for file size ---
    echo "Applying optimization to $image_path..."

    # Get file type
    filename=$(basename -- "$image_path")
    extension="${filename##*.}"
    extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    # Remove all metadata (EXIF, comments, etc.) to reduce size - always apply first
    mogrify -strip "$image_path"

    # Re-read size after stripping metadata, this is the base size for further optimization decisions
    current_file_size=$(stat -c%s "$image_path" 2>/dev/null || stat -f%z "$image_path" 2>/dev/null)
    if [ -z "$current_file_size" ]; then
        echo "Error: Could not get current file size after stripping for $image_path."
        echo "---"
        continue
    fi


    case "$extension_lower" in
        jpg|jpeg)
            # JPEG-specific optimization logic
            current_quality=$JPEG_QUALITY_DEFAULT
            if (( current_file_size > TARGET_SIZE_BYTES )); then
                echo "File size ($(format_bytes $current_file_size)) is above target ($(format_bytes $TARGET_SIZE_BYTES)). Trying to reduce."
                # Start with a slightly lower quality for aggressive reduction
                current_quality=$((JPEG_QUALITY_DEFAULT - JPEG_QUALITY_STEP))
                # Iterate, reducing quality until target is met or min quality reached
                while (( current_file_size > TARGET_SIZE_BYTES && current_quality >= JPEG_QUALITY_MIN )); do
                    echo "Attempting to compress with JPEG quality $current_quality%..."
                    mogrify -quality "$current_quality%" "$image_path"
                    current_file_size=$(stat -c%s "$image_path" 2>/dev/null || stat -f%z "$image_path" 2>/dev/null)
                    echo "Current size: $(format_bytes $current_file_size)"
                    if (( current_file_size > TARGET_SIZE_BYTES )); then
                        current_quality=$((current_quality - JPEG_QUALITY_STEP))
                    fi
                done
                if (( current_file_size > TARGET_SIZE_BYTES )); then
                    echo "Warning: Could not reduce JPEG to below $(format_bytes $TARGET_SIZE_BYTES) even at minimum quality $JPEG_QUALITY_MIN%."
                else
                    echo "JPEG optimized to below target with quality $current_quality%."
                fi
            else
                echo "File size ($(format_bytes $current_file_size)) is already below or at target. Applying default JPEG optimization ($JPEG_QUALITY_DEFAULT%)."
                mogrify -quality "$JPEG_QUALITY_DEFAULT%" "$image_path"
            fi
            ;;
        png)
            # PNG-specific optimization logic
            # For PNGs, -quality influences compression algorithms and color palette reduction (can be lossy for PNGs).
            if (( current_file_size > TARGET_SIZE_BYTES )); then
                echo "File size ($(format_bytes $current_file_size)) is above target ($(format_bytes $TARGET_SIZE_BYTES)). Applying aggressive PNG quality $PNG_QUALITY_LARGE_FILE%."
                mogrify -quality "$PNG_QUALITY_LARGE_FILE%" "$image_path"
            else
                echo "File size ($(format_bytes $current_file_size)) is already below or at target. Applying standard PNG quality $PNG_QUALITY_SMALL_FILE%."
                mogrify -quality "$PNG_QUALITY_SMALL_FILE%" "$image_path"
            fi
            ;;
        gif)
            # GIF-specific optimization logic
            # mogrify -optimize is generally the best for GIFs to reduce frames/colors.
            echo "Applying GIF optimization (-optimize)."
            mogrify -optimize "$image_path"
            ;;
        *)
            echo "No format-specific optimization for $extension_lower beyond stripping metadata."
            ;;
    esac

    # Get final file size for comparison
    final_size=$(stat -c%s "$image_path" 2>/dev/null || stat -f%z "$image_path" 2>/dev/null)
    if [ -z "$final_size" ]; then
        echo "Error: Could not get final file size for $image_path."
    else
        echo "Final size: $(format_bytes $final_size)"

        if (( final_size < initial_size )); then
            echo "Result: Successfully reduced file size from $(format_bytes $initial_size) to $(format_bytes $final_size)."
        elif (( final_size > initial_size )); then
            echo "Warning: File size increased from $(format_bytes $initial_size) to $(format_bytes $final_size). This is highly unexpected for optimization."
            echo "         Consider reviewing your optimization settings."
        else
            echo "Result: File size remained the same: $(format_bytes $final_size)."
        fi

        # Check if the target was met for images that started larger than the target
        if (( initial_size > TARGET_SIZE_BYTES )) && (( final_size < TARGET_SIZE_BYTES )); then
            echo "Target Met: File size is now below $(format_bytes $TARGET_SIZE_BYTES)."
        elif (( initial_size > TARGET_SIZE_BYTES )) && (( final_size >= TARGET_SIZE_BYTES )); then
            echo "Target NOT Met: File size is still above or at $(format_bytes $TARGET_SIZE_BYTES)."
        fi
    fi
    echo "---"
done

echo "Image processing and optimization completed."
