import React, { useCallback } from 'react';
import { Alert, Button, Linking, StyleSheet, View, Text } from 'react-native';

const supportedURL = 'https://github.com/nickodsss';

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button title={children} onPress={handlePress} />;
};

const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text>Created By: Nickolas Darselio</Text>
            <OpenURLButton url={supportedURL}>My Personal Github Account</OpenURLButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AboutPage;