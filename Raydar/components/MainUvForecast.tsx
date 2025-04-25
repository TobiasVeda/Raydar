import React, {FC, useEffect, useMemo, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";


interface prop{
    location: string,
    uv: number
}

export const MainUvForecast = ({ location, uv }:prop) => {

    const [name, setName] = useState('');
    const [strength, setStrength] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(require("../assets/images/low.png"));


    useEffect(() => {
        setName(location);
        setStrength(uv);

        if(uv <= 2){
            setCategory("Low");
            setImage(require("../assets/images/low.png"));
        } else if(uv <= 5){
            setCategory("Moderate");
            setImage(require("../assets/images/moderate.png"));
        } else if(uv <= 7){
            setCategory("High");
            setImage(require("../assets/images/high.png"));
        } else if(uv <= 10){
            setCategory("Very High");
            setImage(require("../assets/images/high.png"));
        } else{
            setCategory("Extreme");
            setImage(require("../assets/images/high.png"));
        }
    }, [location, uv]);


    return (
        <View style={styles.readingContainer}>
            <Image source={image} style={styles.gaugeImage}/>
            <Text style={styles.bigNumber}>{strength}</Text>
            <Text style={styles.category}>{category}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    readingContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 26,
        paddingHorizontal: 18,
        alignItems: 'center',
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    gaugeImage: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    bigNumber: {
        fontSize: 72,
        fontWeight: '700',
        lineHeight: 72,
    },
    category: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 4,
    },
});