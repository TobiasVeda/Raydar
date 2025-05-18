import React, { FC, useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    uv: number,
    city: string,
    temperature: number
}

export const MainUvForecast: FC<Props> = ({ uv, city, temperature }) => {
    const [currentSpf, setCurrentSpf] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(require("../assets/images/low.png"));

    useEffect(() => {
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
            {/* Location */}
            <View style={styles.locationRow}>
                <Ionicons
                    name="location-outline"
                    size={20}
                    color="#171717"
                    style={styles.locationIcon}
                />
                <Text style={styles.locationText}>{city}</Text>
            </View>

            {/* Main layout row */}
            <View style={styles.contentRow}>
                {/* Left side: UV visual and number */}
                <View style={styles.uvBlock}>
                    <Image source={image} style={styles.gaugeImage} />
                    <Text style={styles.bigNumber}>{uv}</Text>
                    <Text style={styles.category}>{category}</Text>
                </View>

                {/* Right side: stacked temp and SPF */}
                <View style={styles.rightCol}>
                    <Text style={styles.temp}>{temperature}°</Text>
                    <View style={{ height: 16 }} /> {/* Space between temp and SPF */}
                    <View style={styles.spfBlock}>
                        <Text style={styles.spfLabel}>SPF</Text>
                        <View style={styles.spfCircle}>
                            <Text style={styles.spfNumber}>{currentSpf}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 18,
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
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uvBlock: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    gaugeImage: {
        width: 140,
        height: 70,
        resizeMode: "contain",
        marginBottom: 8,
        marginRight: 30,
    },
    bigNumber: {
        fontSize: 80,
        fontWeight: '600',
        color: '#171717',
        lineHeight: 80,
        marginRight: 30,
    },
    category: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginTop: 4,
        marginRight: 30,
    },
    rightCol: {
        alignItems: 'flex-end',
        flex: 0.5,
        marginRight: 40,
    },
    temp: {
        fontSize: 48, // Increased from 36
        fontWeight: '700',
        color: '#171717',
        marginRight: -20,
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
        width: 90,  // Increased from 70
        height: 90,
        borderRadius: 45,
        backgroundColor: '#F5AB3C66',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spfNumber: {
        fontSize: 36, // Increased from 28
        fontWeight: '700',
        color: '#171717',
    },
});
