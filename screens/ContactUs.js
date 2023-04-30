import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";

export default function ContactUs({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <ActionButton title="אזור אישי" />
                <View style={{ flex: 0.2 }} />
                <View style={styles.menu}>
                    <MyButton title="שליחת הודעה למדריך" onPress={() => navigation.navigate('InstructorMessageScreen')} />
                    <MyButton title="צ׳אט בוט 24/7" onPress={() => navigation.navigate('ChatbotScreen')} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>אנחנו כאן בשבילכם</Text>
                    <Image source={require('../assets/images/contactIGY.png')} style={styles.image} />
                </View>
            </View>
            <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    menu: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "5%",
    },
    content: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "5%",
        paddingTop: "5%",
        paddingBottom: "5%",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 6,
    },
    image: {
        flex: 0.5,
        width: "100%",
        resizeMode: "contain",
    },
});
