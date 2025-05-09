import React, { FC, useState, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Swipeable as GestureSwipeable } from 'react-native-gesture-handler';
import { LocationCard, Location } from '@/components/LocationCard';

const { width } = Dimensions.get('window');
// If you don’t actually use CARD_WIDTH in this file, feel free to remove it.
const CARD_WIDTH = width - 36;

const LocationScreen: FC = () => {
    const [locations, setLocations] = useState<Location[]>([
        { name: 'Grimstad Agder', uv: 3 },
        { name: 'Kristiansand',   uv: 2 },
        { name: 'Tanzania',       uv: 10 },
        { name: 'Florida',        uv: 6 },
    ]);

    // Explicitly allow null while refs haven’t been set
    const swipeableRefs = useRef<Array<GestureSwipeable | null>>([]);

    const handleDelete = (i: number) => {
        swipeableRefs.current[i]?.close();
        setLocations(l => l.filter((_, idx) => idx !== i));
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Ionicons
                    name="location-outline"
                    size={40}
                    color="#34C759"
                    style={styles.topIcon}
                />

                {locations.map((loc, idx) => (
                    <LocationCard
                        key={loc.name}
                        ref={r => { swipeableRefs.current[idx] = r; }}
                        loc={loc}
                        onDelete={() => handleDelete(idx)}
                        onPressDots={() => swipeableRefs.current[idx]?.openRight()}
                    />
                ))}

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addTxt}>+ Add New</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default LocationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
    },
    scrollContent: {
        paddingTop: 24,
        paddingHorizontal: 18,
        paddingBottom: 120,
    },
    topIcon: {
        alignSelf: 'center',
        marginBottom: 18,
    },
    addBtn: {
        alignSelf: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#34C759',
        backgroundColor: '#34C759',
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    addTxt: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
});
