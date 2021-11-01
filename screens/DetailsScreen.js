import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../assets/colors/Colors'
import { useFonts } from 'expo-font';


const DetailsScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;

    const renderIngredients = ({ item }) => {
        return (
            <View style={[styles.ingItemContainer, { marginLeft: item.id === '1' ? 20 : 0 }]}>
                <Image
                    source={item.image}
                    style={styles.ingImage}
                />
            </View>
        )
    }

    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    })
    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <View style={styles.headerLeft}>
                            <Feather name="chevron-left" size={12} color={colors.textDark} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <MaterialCommunityIcons name="star" size={12} color={colors.white} />
                    </View>
                </View>
            </SafeAreaView>
            {/* Titles */}
            <View style={styles.titlesContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            {/* Price */}
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>$ {item.price}</Text>
            </View>
            {/* Infos */}
            <View style={styles.infoContainer}>
                <View style={styles.leftInfoContainer}>
                    <View style={styles.infoItemContainer}>
                        <Text style={styles.infoItemTitle}>Size</Text>
                        <Text style={styles.infoItemText}>{item.sizeName} {item.sizeNumber}"</Text>
                    </View>
                    <View style={styles.infoItemContainer}>
                        <Text style={styles.infoItemTitle}>Crust</Text>
                        <Text style={styles.infoItemText}>{item.crust}</Text>
                    </View>
                    <View style={styles.infoItemContainer}>
                        <Text style={styles.infoItemTitle}>Delivery in</Text>
                        <Text style={styles.infoItemText}>{item.deliveryTime} min</Text>
                    </View>
                </View>
                <View>
                    <Image source={item.image} style={styles.itemImage} />
                </View>
            </View>
            {/* Ingredients */}
            <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Ingredients</Text>
                <View style={styles.ingredientsListContainer}>
                    <FlatList
                        data={item.ingredients}
                        renderItem={renderIngredients}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            {/* Button */}
            <TouchableOpacity onPress={() => alert("Order placed!")}>
                <View style={styles.orderButtonContainer}>
                    <Text style={styles.orderText}>Place an Order</Text>
                    <Feather name="chevron-right" size={18} color={colors.black} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    headerLeft: {
        borderColor: colors.textLight,
        borderWidth: 2,
        padding: 12,
        borderRadius: 10,
    },
    headerRight: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 2,
    },
    titlesContainer: {
        paddingHorizontal: 20,
        marginTop: 15,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.textDark,
        width: '55%',
    },
    priceContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    priceText: {
        color: colors.price,
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
    },
    infoContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftInfoContainer: {
        paddingLeft: 20,
    },
    infoItemContainer: {
        marginBottom: 15,
    },
    infoItemTitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: colors.textLight,
    },
    infoItemText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        color: colors.textDark,
    },
    itemImage: {
        resizeMode: 'contain',
        marginLeft: 20,
    },
    ingredientsContainer: {
        marginTop: 20,
    },
    ingredientsTitle: {
        paddingHorizontal: 20,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.textDark,
    },
    ingredientsListContainer: {
        paddingVertical: 20,
    },
    ingItemContainer: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginRight: 15,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    ingImage: {
        resizeMode: 'contain',
    },
    orderButtonContainer: {
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        color: colors.textDark,
        marginRight: 10,
    },
});

export default DetailsScreen;
