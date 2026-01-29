import { useEffect, useState } from 'react';
import { Flex, View, useBreakpointValue } from '@aws-amplify/ui-react';
import React from 'react';
import './skeleton.css';

const ProductSkeletonCard = () => (
    <View
        width="100%"
        maxWidth="400px"
        minWidth={"380px"}
        padding="1rem"
        borderRadius="8px"
        border="1px solid #eee"
    >
        <View className="skeleton shimmer" height="180px" borderRadius="8px" />
        <View className="skeleton shimmer" height="16px" marginTop="1rem" width="80%" />
        <View className="skeleton shimmer" height="16px" marginTop="0.5rem" width="60%" />
        <View className="skeleton shimmer" height="24px" marginTop="1rem" width="50%" />
    </View>
);

const FilterSkeleton = () => (
    <View width="300px" padding="1rem">
        {[...Array(4)].map((_, i) => (
            <View key={i} className="skeleton shimmer" height="40px" marginBottom="1rem" />
        ))}
        <View className="skeleton shimmer" height="16px" width="100px" marginBottom="0.5rem" />
        <View className="skeleton shimmer" height="30px" width="100%" marginBottom="1rem" />
        <Flex justifyContent="space-between" gap="0.5rem">
            <View className="skeleton shimmer" height="30px" width="45%" />
            <View className="skeleton shimmer" height="30px" width="45%" />
        </Flex>
    </View>
);

const SkeletonLoader = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // md breakpoint

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Flex direction="row" backgroundColor={"rgb(246, 246, 246)"} gap="10rem" padding={{base:"1rem", xl:"4rem 5rem"}}>
            {!isMobile && (
                <View width="300px">
                    <FilterSkeleton />
                </View>
            )}

            <Flex wrap="wrap" gap="1.5rem" flex="1">
                {[...Array(6)].map((_, i) => (
                    <ProductSkeletonCard key={i} />
                ))}
            </Flex>
        </Flex>
    );
};


export default SkeletonLoader;
