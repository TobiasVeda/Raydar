// components/MainUvForecast.tsx

import React, { FC, useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ViewStyle
} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface Props {
    uv: number,
    city: string,
    temperature: number
}

export const MainUvForecast: FC<Props> = ({uv, city, temperature}) => {
    const [currentUv, setCurrentUv] = useState(0);
    const [currentTemp, setCurrentTemp] = useState(0);
    const [currentCity, setCurrentCity] = useState("");
    const [currentSpf, setCurrentSpf] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(
        require("../assets/images/low.png")
    );

    useEffect(() => {
        setCurrentUv(uv);
        setCurrentTemp(temperature);
        setCurrentCity(city);

        if (uv <= 2) {
            setCategory("Low");
            setImage(require("../assets/images/low.png"));
            setCurrentSpf("0");
        } else if (uv <= 5) {
            setCategory("Moderate");
            setImage(require("../assets/images/moderate.png"));
            setCurrentSpf("15");
        } else if (uv <= 7) {
            setCategory("High");
            setImage(require("../assets/images/high.png"));
            setCurrentSpf("30");
        } else if (uv <= 9) {
            setCategory("Very High");
            setImage(require("../assets/images/high.png"));
            setCurrentSpf("50");
        } else {
            setCategory("Extreme");
            setImage(require("../assets/images/high.png"));
            setCurrentSpf("50+");
        }
    }, [uv]);

    return (
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
                    <View style={[styles.readingContainer]}>
                        <Image source={image} style={styles.gaugeImage} />
                        <Text style={styles.bigNumber}>{currentUv}</Text>
                        <Text style={styles.category}>{category}</Text>
                    </View>
                </View>
                <View style={styles.spfBlock}>
                    <Text style={styles.spfLabel}>SPF</Text>
                    <View style={styles.spfCircle}>
                        <Text style={styles.spfNumber}>{currentSpf}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    readingContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 26,
        paddingHorizontal: 18,
        alignItems: "center",
        marginBottom: 18,

        // ---- flattened out ----
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    gaugeImage: {
        width: 120,
        height: 60,
        resizeMode: "contain",
        borderRadius: 10,
    },
    bigNumber: {
        fontSize: 72,
        fontWeight: "700",
        lineHeight: 72,
    },
    category: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 4,
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
});
