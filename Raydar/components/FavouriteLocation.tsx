import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import {useState} from "react";

interface prop{
    location: string,
    uv: number
}


export const FavouriteLocation = ({ location, uv }:prop)=>{

    let image = "../assets/images/icon.png";
    let category = "";
    if(uv <= 2){
        category = "Low";
        image += "low.svg";
    } else if(uv <= 5){
        category = "Moderate";
        image += "moderate.svg";
    } else if(uv <= 7){
        category = "High";
        image += "high.svg";
    } else if(uv <= 10){
        category = "Very High";
        image += "high.svg";
    } else{
        category = "Extreme";
        image += "high.svg";
    }

    return(
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{location}</Text>

            <View style={styles.cardBody}>
                <Image source={require(image)}/>
                <View style={styles.gaugePlaceholder} />

                <View style={styles.valueBlock}>
                    <Text style={styles.uvNumber}>{uv}</Text>
                    <Text style={styles.uvLabel}>{category}</Text>
                </View>
            </View>
        </View>
    )
}



const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF6', // very light beige from mock‑up
    },
    scrollContent: {
        paddingTop: 24,
        paddingHorizontal: 18,
        paddingBottom: 120, // leaves room for nav bar
    },
    /* ------- placeholders ------- */
    topIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        alignSelf: 'center',
        marginBottom: 18,
    },
    gaugePlaceholder: {
        width: 120,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#EDEDED',
    },
    navIconPlaceholder: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#E0E0E0',
    },
    /* ------- cards ------- */
    card: {
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
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 4,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
    },
    valueBlock: {
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    uvNumber: {
        fontSize: 56,
        fontWeight: '700',
        lineHeight: 56,
    },
    uvLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
    /* ------- + Add New ------- */
    addBtn: {
        alignSelf: 'center',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 6,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    addTxt: {
        fontSize: 20,
        fontWeight: '600',
    },
    /* ------- nav bar ------- */
    navBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: width,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F1F1',
    },
});