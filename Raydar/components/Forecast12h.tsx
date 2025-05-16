import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {FC} from "react";
import {formatTo12Hour, UvStrength} from "@/services/yrApi";

interface Props {
    forecast: UvStrength[]
}

export const Forecast12h: FC<Props> = ({forecast}) =>{

    return(
        <View style={styles.forecastCard}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContentHorizontal}
            >
                {forecast.map((item, index) => (
                    <View key={index} style={styles.forecastItem}>
                        <Text style={styles.time}>{formatTo12Hour(item.timestamp)}</Text>
                        <Text style={styles.uv}>{item.strength}</Text>
                        {/*Shows temperature, but looks shit*/}
                        {/*<Text style={styles.uv}>{item.temperature}°</Text>*/}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    forecastCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        height: 120,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
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
});