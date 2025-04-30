import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarIconProps } from '@react-navigation/bottom-tabs';

/**
 * TabLayout – FINAL routing & colours
 * -----------------------------------
 * File → Route mapping in your (tabs) folder:
 *   • location.tsx  → Locations list (green)
 *   • index.tsx     → UV dashboard (orange)
 *   • settings.tsx  → Settings page (blue)
 */
export default function TabLayout() {
    const INACTIVE_COLOR = '#444';

    const renderIcon = (name: string, activeColor: string) =>
        ({ focused }: BottomTabBarIconProps) => (
            <Ionicons
                name={name}
                size={42}
                color={focused ? activeColor : INACTIVE_COLOR}
                style={{ marginBottom: -27 }}
            />
        );

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarShowLabel: false,
                tabBarActiveTintColor: INACTIVE_COLOR,
                tabBarInactiveTintColor: INACTIVE_COLOR,
                safeAreaInsets: { bottom: 0 },
                tabBarStyle: {
                    height: 70,
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E0E0E0',
                    shadowColor: 'transparent',
                    elevation: 0,
                    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
                },
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            {/* Locations – green */}
            <Tabs.Screen
                name="location"
                options={{
                    tabBarIcon: renderIcon('location-outline', '#34C759'),
                }}
            />

            {/* UV Dashboard – orange */}
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: renderIcon('sunny-outline', '#F5AB3C'),
                }}
            />

            {/* Settings – blue */}
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: renderIcon('settings-outline', '#007AFF'),
                }}
            />
        </Tabs>
    );
}
