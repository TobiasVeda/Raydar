import React, { FC, useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    location: string;
    uv: number;
    onPressDots: () => void;
    style?: ViewStyle;
}

export const FavouriteLocation: FC<Props> = ({location, uv, onPressDots, style, }) => {
    const [strength, setStrength] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(require('../assets/images/low.png'));

    useEffect(() => {
        setStrength(uv);
        if (uv <= 2) {
            setCategory('Low');
            setImage(require('../assets/images/low.png'));
        } else if (uv <= 5) {
            setCategory('Moderate');
            setImage(require('../assets/images/moderate.png'));
        } else if (uv <= 7) {
            setCategory('High');
            setImage(require('../assets/images/high.png'));
        } else if (uv <= 10) {
            setCategory('Very High');
            setImage(require('../assets/images/high.png'));
        } else {
            setCategory('Extreme');
            setImage(require('../assets/images/high.png'));
        }
    }, [uv]);

    return (
        <View style={[styles.card, style]}>
            <View style={styles.headerRow}>
                <Text style={styles.cardTitle}>{location}</Text>
                <TouchableOpacity
                    onPress={onPressDots}
                    style={styles.dotsBtn}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons
                        name="ellipsis-vertical-outline"
                        size={24}
                        color="#333"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
                <Image source={image} style={styles.gaugeImage} />

                <View style={styles.valueBlock}>
                    <Text style={styles.uvNumber}>{strength}</Text>
                    <Text style={styles.uvLabel}>{category}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dotsBtn: {
        padding: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
    },
    gaugeImage: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    valueBlock: {
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    uvNumber: {
        fontSize: 56,
        fontWeight: '700',
        lineHeight: 56,
    },
    uvLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
});
