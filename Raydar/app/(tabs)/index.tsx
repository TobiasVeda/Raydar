import React, {FC, useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';  // Import SafeAreaView
import { MainUvForecast } from '@/components/MainUvForecast';
import {useFocusEffect} from "expo-router";
import {Coordinates, getCurrentLocation} from "@/services/location";
import {formatTo12Hour, get12HourForecast, getUvForecast, UvStrength} from "@/services/yrApi";
import {getNameFromCoordinate} from "@/services/geocode";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 36;

const ExploreScreen: FC = () => {
    const dummyForecastData:UvStrength[] = [
        { timestamp: "2025-05-16T01:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T02:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T03:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T04:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T05:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T06:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T07:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T08:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T09:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T10:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-05-16T11:00:00Z", strength: 0, temperature: 0 },
        { timestamp: "2025-06-16T00:00:00Z", strength: 0, temperature: 0 },
    ];


    const [currentUv, setCurrentUv] = useState(0);
    const [currentTemp, setCurrentTemp] = useState(0);
    const [currentSpf, setCurrentSpf] = useState(0);
    const [currentCity, setCurrentCity] = useState("Loading...");
    const [forecastData, setForecastData] = useState(dummyForecastData);

    useEffect(() => {
        const updateMain = async ()=>{
            let loc = await getCurrentLocation();
            if (loc == null){
                setCurrentCity("Location Permission Denied")
                return;
            }
            let forecast = await getUvForecast(loc!.lat, loc!.lon);
            let city = await getNameFromCoordinate(loc!.lat, loc!.lon);
            let longTerm = get12HourForecast(forecast);
            setCurrentUv(forecast[0].strength);
            setCurrentTemp(forecast[0].temperature);
            // setCurrentSpf()
            setCurrentCity(city);
            setForecastData(longTerm);
        }
        updateMain();
        const interval = setInterval(() => {
            updateMain();
        },60*1000); // 1 minute
    }, []);



    return (
        <View style={styles.container}>{/* Wrap with SafeAreaView */}
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
                <View style={styles.mainCard}>
                    <View style={styles.locationRow}>
                        <Ionicons
                            name="location-outline"
                            size={20}
                            color="#171717"
                            style={styles.locationIcon}
                        />
                        <Text style={styles.locationText}>{currentCity}</Text>
                    </View>
                    <View style={styles.mainCardRow}>
                        <Text style={styles.tempLarge}>{currentTemp}°</Text>
                        <View style={styles.uvBlock}>
                            <MainUvForecast location="" uv={currentUv} />
                        </View>
                        <View style={styles.spfBlock}>
                            <Text style={styles.spfLabel}>SPF</Text>
                            <View style={styles.spfCircle}>
                                <Text style={styles.spfNumber}>{currentSpf}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* UV forecast title outside card for more space */}
                <Text style={styles.forecastTitle}>UV Forecast:</Text>
                <View style={styles.forecastCard}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContentHorizontal}
                    >
                        {forecastData.map((item, index) => (
                            <View key={index} style={styles.forecastItem}>
                                <Text style={styles.time}>{formatTo12Hour(item.timestamp)}</Text>
                                <Text style={styles.uv}>{item.strength}</Text>
                                {/*Shows temperature, but looks shit*/}
                                {/*<Text style={styles.uv}>{item.temperature}°</Text>*/}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addTxt}>Enable Notifications</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff8eb',
        paddingTop: 30, // Optional: Adjust paddingTop for devices with notches
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

    mainCard: {
        width: '100%',             // fill the ScrollView’s inner width
        backgroundColor: '#FFFFFF',
        borderRadius: 20,          // match forecastCard corners
        paddingVertical: 12,       // same vertical padding
        paddingHorizontal: 8,      // same horizontal padding
        marginBottom: 18,
        // same drop-shadow as forecastCard
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationIcon: {
        marginRight: 6,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#171717',
    },

    mainCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tempLarge: {
        fontSize: 48,
        fontWeight: '700',
        color: '#171717',
    },
    uvBlock: {
        flex: 1,
        alignItems: 'center',
    },
    spfBlock: {
        alignItems: 'center',
    },
    spfLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#171717',
    },
    spfCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#F5AB3C66',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spfNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#171717',
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
    scrollContentHorizontal: {
        paddingHorizontal: 4,
    },
    forecastItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 60,
    },
    time: {
        fontSize: 16,
        fontWeight: '600',
        color: '#888888',
        marginBottom: 6,
        textAlign: 'center',
    },
    uv: {
        fontSize: 37,
        fontWeight: '700',
        lineHeight: 36,
        textAlign: 'center',
        color: '#171717',
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
