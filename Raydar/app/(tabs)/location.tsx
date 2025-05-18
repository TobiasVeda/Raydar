import React, {FC, useState, useRef, useEffect, useCallback} from 'react';
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
import {getUvForecast} from "@/services/yrApi";
import {getNameFromCoordinate} from "@/services/geocode";
import {getUserdata} from "@/services/db/db";
import {GeoPoint} from "firebase/firestore";
import {useFocusEffect} from "expo-router";


const LocationScreen: FC = () => {
    const [newLocationAdded, setNewLocationAdded] = useState(0);
    const [coordinates, setCoordinates] = useState<GeoPoint[]>([])
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateForecast();
        },5*60*1000); // 5 minutes
    }, []);

    const updateForecast = async ()=>{
        if (!coordinates.length){
            return;
        }
        let temp:Location[] = [];
        for (let i = 0; i < coordinates.length; i++) {
            let name = await getNameFromCoordinate(coordinates[i].latitude, coordinates[i].longitude);
            let uv = (await getUvForecast(coordinates[i].latitude, coordinates[i].longitude))[0].strength;
            temp[i] = {name:name, uv:uv};
        }
        setLocations(temp);
    }
    const pullFromDb = async ()=>{
        let document = await getUserdata();
        if (!document){
            return;
        }
        setCoordinates(document!.favouriteLocations);
        // setCoordinates([ // dummy data to prevent need for login
        //     new GeoPoint(58.3405, 8.59343),
        //     new GeoPoint(39.56939, 2.65024),
        //     new GeoPoint(68.3405, 8.59343),
        //     new GeoPoint(-1, -1),
        //     new GeoPoint(0, 0),
        // ]);
    }

    useEffect(() => {
        updateForecast();
    }, [coordinates]);

    useEffect(() => {
        // new favourite location added, immediately pull from db to update
        // Might just call pullFromDb() in buttonPressed function
        pullFromDb();
    }, [newLocationAdded]);

    useFocusEffect(
        useCallback(() => {
            pullFromDb();
        }, [])
    );


    const swipeableRefs = useRef<Array<GestureSwipeable | null>>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handlePressDots = (index: number) => {
        if (openIndex === index) {
            swipeableRefs.current[index]?.close();
            setOpenIndex(null);
        } else {
            swipeableRefs.current.forEach((ref, i) => {
                if (ref && i !== index) {
                    ref.close();
                }
            });
            swipeableRefs.current[index]?.openRight();
            setOpenIndex(index);
        }
    };

    const handleDelete = (index: number) => {
        swipeableRefs.current[index]?.close();
        setLocations(prev => prev.filter((_, i) => i !== index));
        if (openIndex === index) setOpenIndex(null);
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
                        key={loc.name} // Should add checks when adding to prevent duplicates
                        ref={r => { swipeableRefs.current[idx] = r; }}
                        loc={loc}
                        onDelete={() => handleDelete(idx)}
                        onPressDots={() => handlePressDots(idx)}
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
