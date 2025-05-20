import React, { forwardRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import type { Swipeable as GestureSwipeable } from 'react-native-gesture-handler';
import { Swipeable } from 'react-native-gesture-handler';
import { FavouriteLocation } from '@/components/FavouriteLocation';

export interface Location {
    name: string;
    uv: number;
    latitude: number;
    longitude: number;
}

interface LocationCardProps {
    loc: Location;
    onDelete: () => void;
    onPressDots: () => void;
    style?: ViewStyle;
}

export const LocationCard = forwardRef<GestureSwipeable, LocationCardProps>(
    ({ loc, onDelete, onPressDots, style }, ref) => (
        <Swipeable
            ref={ref}
            overshootRight={false}
            containerStyle={[styles.swipeContainer, style]}
            childrenContainerStyle={styles.swipeChildren}
            renderRightActions={() => (
                <View style={styles.deleteContainer}>
                    <View style={styles.fullBgInAction} />
                    <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
        >
            <FavouriteLocation
                location={loc.name}
                uv={loc.uv}
                onPressDots={onPressDots}
            />
        </Swipeable>
    )
);

const styles = StyleSheet.create({
    swipeContainer: {
        marginBottom: 18,
        borderRadius: 20,
        overflow: 'visible',
    },
    swipeChildren: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    deleteContainer: {
        width: 100,
        marginBottom: 18,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    fullBgInAction: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 200,
        backgroundColor: '#FF3B30',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    deleteBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
});
