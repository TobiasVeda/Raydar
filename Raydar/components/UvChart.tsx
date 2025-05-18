import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { UvStrength, formatTo12Hour } from '@/services/yrApi';

interface Props {
    forecast: UvStrength[];
}

export const UvChart: React.FC<Props> = ({ forecast }) => {
    if (forecast.length === 0) return null;

    const allLabels = forecast.map(item => formatTo12Hour(item.timestamp));
    const filteredLabels = allLabels.map((label, index) => index % 4 === 0 ? label : '');
    const data = forecast.map(item => item.strength);

    return (
        <View style={styles.forecastCard}>
            <Text style={styles.title}>UV Chart Today</Text>
            <LineChart
                data={{
                    labels: filteredLabels,
                    datasets: [{ data: data }],
                }}
                width={Dimensions.get('window').width - 36}
                height={200}
                yAxisSuffix=""
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: 'transparent',
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    decimalPlaces: 1,
                    color: () => `rgba(255, 165, 0, 1)`,
                    labelColor: () => `#666`,
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                    propsForBackgroundLines: {
                        stroke: '#F5AB3C',     // same color as line or you can use '#ddd'
                        strokeDasharray: '',   // solid line
                        strokeWidth: 0.5,      // thinner
                    },
                }}
                bezier
                style={styles.chart}
            />
        </View>
    );
};

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
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        color: '#171717',
        textAlign: 'center',
    },
    chart: {
        borderRadius: 16,
        marginLeft: -40,
        backgroundColor: 'transparent',
    },
});
