import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import {
    Feather,
    MaterialCommunityIcons
}
    from '@expo/vector-icons';
import categoriesData from '../assets/data/categoriesData';
import popularData from '../assets/data/popularData';
import colors from '../assets/colors/Colors';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation();

    const renderCategoryItem = ({ item }) => {
        return (
            <View style={[
                styles.categoryItemContainer,
                {
                    backgroundColor:
                        item.selected ? colors.primary : colors.white,
                    marginLeft: item.id == '1' ? 20 : 0,
                }]}>
                <Image source={item.image} style={styles.categoryItemImage} />
                <Text style={styles.categoryItemTitle}>
                    {item.title}
                </Text>
                <View style={[
                    styles.categorySelectContainer,
                    {
                        backgroundColor: item.selected ? colors.background : colors.secondary,
                    }
                ]}>
                    <Feather
                        name="chevron-right"
                        size={8}
                        style={styles.categorySelectIcon}
                        color={item.selected ? colors.black : colors.white}
                    />
                </View>
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
            <ScrollView contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <SafeAreaView>
                    <View style={styles.headerContainer}>
                        <Image source={require('../assets/images/profile.png')} style={styles.image} />
                        <Feather name="menu" size={24} color={colors.textDark} />
                    </View>
                </SafeAreaView>
                {/* Titles */}
                <View style={styles.titlesContainer}>
                    <Text style={styles.subTitle}>
                        Food
                    </Text>
                    <Text style={styles.mainTitle}>
                        Delivery
                    </Text>
                </View>
                {/* Search Container */}
                <View style={styles.searchContainer}>
                    <Feather name="search" size={16} color={colors.textDark} />
                    <View style={styles.searchInput}>
                        <Text style={styles.searchText}>Search...</Text>
                    </View>
                </View>
                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    <Text style={styles.categoriesText}>Categories</Text>
                    <View style={styles.categoriesListContainer}>
                        <FlatList
                            data={categoriesData}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* Popular */}
                <View style={styles.popularContainer}>
                    <Text style={styles.popularTitle}>Popular</Text>
                    {popularData.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Details', { item: item })}>
                            <View
                                style={[styles.popularCardContainer,
                                {
                                    marginTop: item.id == '1' ? 10 : 20
                                }]}
                            >
                                <View>
                                    <View>
                                        <View style={styles.popularTopContainer}>
                                            <MaterialCommunityIcons name="crown" size={12} color={colors.primary} />
                                            <Text style={styles.popularTopText}>Top of the week</Text>
                                        </View>
                                        <View style={styles.popularTitlesContainer}>
                                            <Text style={styles.popularTitlesTitle}>{item.title}</Text>
                                            <Text style={styles.popularTitlesWeight}>Weight {item.weight}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.popularCardBottom}>
                                        <View style={styles.addButton}>
                                            <Feather name="plus" size={10} color={colors.textDark} />
                                        </View>
                                        <View style={styles.ratingContainer}>
                                            <MaterialCommunityIcons name="star" size={10} color={colors.textDark} />
                                            <Text style={styles.itemRating}>{item.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.popularCardRight}>
                                    <Image source={item.image} style={styles.popularImage} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 40,
    },
    titlesContainer: {
        marginTop: 30,
        paddingHorizontal: 20
    },
    subTitle: {
        fontFamily: 'Montserrat-Regular',
        color: colors.textDark,
        fontSize: 16,

    },
    mainTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 32,
        color: colors.textDark,
        marginTop: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        borderBottomColor: colors.textLight,
        borderBottomWidth: 2,
    },
    searchText: {
        color: colors.textLight,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginBottom: 5,
    },
    categoriesContainer: {
        marginTop: 30,
    },
    categoriesText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.textDark,
        paddingHorizontal: 20,
    },
    categoriesListContainer: {
        paddingTop: 15,
        paddingBottom: 20,
    },
    categoryItemContainer: {
        backgroundColor: colors.primary,
        marginRight: 20,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    categoryItemImage: {
        width: 60,
        height: 60,
        marginTop: 24,
        alignSelf: 'center',
        marginHorizontal: 20,
    },
    categoryItemTitle: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop: 10,
    },
    categorySelectContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 26,
        height: 26,
        borderRadius: 26,
        marginBottom: 20
    },
    categorySelectIcon: {
        alignSelf: 'center',
    },
    popularContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    popularTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.textDark
    },
    popularCardContainer: {
        backgroundColor: colors.white,
        borderRadius: 25,
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        overflow: "hidden",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    popularTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    popularTopText: {
        marginLeft: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14
    },
    popularTitlesContainer: {
        marginTop: 20,

    },
    popularTitlesTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: colors.textDark
    },
    popularTitlesWeight: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: colors.textLight,
        marginTop: 5,
    },
    popularCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: -20,
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 40,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    itemRating: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: colors.textDark,
        marginLeft: 5,
    },
    popularCardRight: {
        marginLeft: 20,
    },
    popularImage: {
        width: 210,
        height: 125,
        resizeMode: 'contain',
    },
});

export default HomeScreen
