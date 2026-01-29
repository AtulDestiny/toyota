#!/bin/bash

# Define the maximum width
MAX_WIDTH=1920

# Find all image files (jpg, jpeg, png, gif, bmp) recursively and process them
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.bmp" \) -print0 | while IFS= read -r -d $'\0' image_path; do
    echo "Processing: $image_path"
    # Get current width of the image
    current_width=$(identify -format "%w" "$image_path")

    # Check if the current width is greater than the maximum width
    if (( current_width > MAX_WIDTH )); then
        echo "Resizing: $image_path (Current width: ${current_width}px)"
        # Resize the image, maintaining aspect ratio and original format
        mogrify -resize "${MAX_WIDTH}x>" "$image_path"
        echo "Resized: $image_path to maximum width of ${MAX_WIDTH}px"
    else
        echo "Skipping: $image_path (Width ${current_width}px is already within limits)"
    fi
done

echo "Image resizing process completed."
