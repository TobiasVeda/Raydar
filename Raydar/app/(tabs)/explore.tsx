import React, { FC, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Forecast12h} from "@/components/Forecast12h";
import {MainUvForecast} from "@/components/MainUvForecast";

/********************************
 * EXPLORE SCREEN (UV Dashboard) *
 ********************************/



const ExploreScreen: FC = () => {
    // Replace with live API value later
    const currentUv = 5;

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

                <MainUvForecast location={"Not Used Yet"} uv={6}/>

                <Forecast12h/>

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                    <Text style={styles.addTxt}>Enable Notifications</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ExploreScreen;

/***************
 * STYLESHEET *
 **************/
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF6',
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
    gaugePlaceholder: {
        width: 180,
        height: 90,
        borderRadius: 14,
        backgroundColor: '#EDEDED',
        marginBottom: 16,
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
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    forecastPlaceholder: {
        width: '100%',
        height: 120,
        borderRadius: 12,
        backgroundColor: '#F1F1F1',
    },
    addBtn: {
        alignSelf: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        paddingVertical: 14,
        paddingHorizontal: 28,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    addTxt: {
        fontSize: 18,
        fontWeight: '600',
    },
});
