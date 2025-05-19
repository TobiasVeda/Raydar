import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainUvForecast } from '@/components/MainUvForecast';
import {getCurrentLocation} from "@/services/location";
import {get24HourForecast, getUvForecast, UvStrength} from "@/services/yrApi";
import { getNameFromCoordinate} from "@/services/geocode";
import { Forecast12h} from "@/components/Forecast12h";
import { UvChart } from '@/components/UvChart';
import {GeoPoint} from "firebase/firestore";
import {useData} from "@/contexts/DataProvider";

const ExploreScreen: FC = () => {
    const [currentLoc, setCurrentLoc] = useState(new GeoPoint(0, 0));
    const [currentUv, setCurrentUv] = useState(0);
    const [currentTemp, setCurrentTemp] = useState(0);
    const [currentCity, setCurrentCity] = useState("Loading...");
    const [forecastData, setForecastData] = useState<UvStrength[]>([]);
    useEffect(() => {
        const updateMain = async ()=>{
            let loc = await getCurrentLocation();
            if (loc == null){
                setCurrentCity("Location Permission Denied")
                return;
            }
            let forecast = await getUvForecast(loc!.lat, loc!.lon);
            let city = await getNameFromCoordinate(loc!.lat, loc!.lon);
            let longTerm = get24HourForecast(forecast);
            setCurrentLoc(new GeoPoint(loc!.lat, loc!.lon));
            setCurrentUv(forecast[0].strength);
            setCurrentTemp(forecast[0].temperature);
            setCurrentCity(city);
            setForecastData(longTerm);
        }
        updateMain();
        const interval = setInterval(() => {
            updateMain();
        },5*60*1000); // 5 minutes
    }, []);

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Orange sun icon at top */}
                <Ionicons
                    name="sunny-outline"
                    size={40}
                    color="#F5AB3C"
                    style={styles.topIcon}
                />

                {/* Header for main forecast */}
                <Text style={styles.mainHeader}>My location:</Text>

                {/* Main card with location, temp, UV, and SPF */}
                <MainUvForecast uv={currentUv} city={currentCity} temperature={currentTemp} coord={currentLoc}/>

                {/* UV forecast title outside card for more space */}
                <Text style={styles.forecastTitle}>UV Forecast:</Text>
                <Forecast12h forecast={forecastData}/>

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addTxt}>Enable Notifications</Text>
                </TouchableOpacity>
                <View style={{ height: 24 }} />
                <Text style={styles.forecastTitle}>UV Chart:</Text>
                <UvChart forecast={forecastData} />
            </ScrollView>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
        paddingTop: 5, // Adjust paddingTop for devices with notches
    },
    scrollContent: {
        paddingTop: 24,
        paddingHorizontal: 18,
        paddingBottom: 120,
    },
    topIcon: {
        alignSelf: 'center',
        marginBottom: 6,
    },
    mainHeader: {
        fontSize: 18,
        fontWeight: '700',   // bold
        marginLeft: 18,
        marginBottom: 8,
        color: '#171717',
        textTransform: 'capitalize',
    },
    forecastTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 18,
        marginBottom: 8,
    },
    forecastCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    /* --- Enable Notifications Button --- */
    addBtn: {
        alignSelf: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F5AB3C',
        backgroundColor: '#F5AB3C',
        paddingVertical: 14,
        paddingHorizontal: 28,
        marginTop: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    addTxt: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
