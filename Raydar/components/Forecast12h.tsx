import {StyleSheet, Text, View} from "react-native";
import React from "react";


export const Forecast12h = () =>{

    return(
        <View>
            <Text style={styles.cardTitle}>12-hour Forecast</Text>
            <View style={styles.forecastCard}/>
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
});