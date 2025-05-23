import React, { FC, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Swipeable as GestureSwipeable } from 'react-native-gesture-handler';
import { LocationCard, Location } from '@/components/LocationCard';
import { getUvForecast } from '@/services/yrApi';
import { getNameFromCoordinate } from '@/services/geocode';
import { useData } from '@/contexts/DataProvider';
import { AddLocationOverlay } from '@/components/AddLocationOverlay';

const LocationScreen: FC = () => {
    const { favouriteLocations, removeAsFavourite, addAsFavourite } = useData();
    const [locations, setLocations] = useState<Location[]>([]);
    const [showSearch, setShowSearch] = useState(false);

    const updateForecast = async () => {
        const temp: Location[] = [];

        for (let i = 0; i < favouriteLocations.length; i++) {
            const { latitude, longitude } = favouriteLocations[i];
            const name = await getNameFromCoordinate(latitude, longitude);
            const uv = (await getUvForecast(latitude, longitude))[0].strength;
            temp.push({ name, uv, latitude, longitude });
        }

        setLocations(temp);
    };

    useEffect(() => {
        updateForecast();
        const interval = setInterval(updateForecast, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [favouriteLocations]);

    const swipeableRefs = useRef<Array<GestureSwipeable | null>>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handlePressDots = (index: number) => {
        if (openIndex === index) {
            swipeableRefs.current[index]?.close();
            setOpenIndex(null);
        } else {
            swipeableRefs.current.forEach((ref, i) => {
                if (ref && i !== index) ref.close();
            });
            swipeableRefs.current[index]?.openRight();
            setOpenIndex(index);
        }
    };

    const handleDelete = async (loc: Location, index: number) => {
        await removeAsFavourite(loc.latitude, loc.longitude);
        swipeableRefs.current[index]?.close();
        setOpenIndex(null);
    };

    const handleSearch = (lat: number, lon: number) => {
        addAsFavourite(lat, lon);
        setShowSearch(false);
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
                        key={`${loc.name}-${loc.latitude}-${loc.longitude}`} // Unik key
                        ref={r => { swipeableRefs.current[idx] = r; }}
                        loc={loc}
                        onPressDots={() => handlePressDots(idx)}
                        onDelete={() => handleDelete(loc, idx)}
                    />
                ))}

                <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.8}
                    onPress={() => setShowSearch(true)}
                >
                    <Text style={styles.addTxt}>+ Add New</Text>
                </TouchableOpacity>
            </ScrollView>

            <AddLocationOverlay
                visible={showSearch}
                onClose={() => setShowSearch(false)}
                onSearch={handleSearch}
            />
        </View>
    );
};

export default LocationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
        paddingTop: 10,
    },
    scrollContent: {
        paddingTop: 20,
        paddingHorizontal: 18,
        paddingBottom: 120,
    },
    topIcon: {
        alignSelf: 'center',
        marginTop: 20,
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
