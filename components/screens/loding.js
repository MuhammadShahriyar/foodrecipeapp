import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export function Loading(props) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator {...props} />
        </View>
    );
}
