import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from '../../src/responsive';

const COLORS = {
    background: '#141326',
    cardBg: '#433DA3',
    primary: '#E3823C',
    accent: '#E33C3C',
    text: '#FFFFFF',
    textSecondary: '#D7C7EC',
    yellow: '#FFC107',
};

const CATEGORIES = [
    { id: 'all', label: 'All', color: COLORS.yellow },
    { id: 'budgeting', label: 'Budgeting', color: COLORS.yellow },
    { id: 'savings', label: 'Savings', color: COLORS.primary },
    { id: 'side-hustles', label: 'Side Hustles', color: COLORS.yellow },
    { id: 'mental-health', label: 'Mental Health', color: COLORS.text },
];

const POSTS = [
    {
        id: 1,
        title: 'Best budgeting apps for beginners?',
        category: 'Budgeting',
        categoryColor: COLORS.yellow,
        username: '@Mushroomwing',
        timeAgo: '2h',
        content: "I'm just starting my financial journey and looking for recommendations.",
        comments: 24,
        likes: 88,
    },
    {
        id: 2,
        title: 'How to build an emergency fund on a tight budget?',
        category: 'Savings',
        categoryColor: COLORS.primary,
        username: '@Mustsayfor',
        timeAgo: '8h',
        content: "I've managed to save ₱500 in 3 months with these strategies.",
        comments: 36,
        likes: 223,
    },
    {
        id: 3,
        title: 'Side hustle success stories - share yours!',
        category: 'Side Hustles',
        categoryColor: COLORS.yellow,
        username: '@LifeatDomib',
        timeAgo: '1d',
        content: 'I started freelance writing and made ₱2000 in my first month.',
        comments: 42,
        likes: 338,
    },
];

const Community = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Filter posts based on selected category
    const filteredPosts = selectedCategory === 'all'
        ? POSTS
        : POSTS.filter(post =>
            post.category.toLowerCase() === selectedCategory.toLowerCase() ||
            post.category.toLowerCase().replace(' ', '-') === selectedCategory
        );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar style="light" backgroundColor={COLORS.background} translucent={false} />

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Communities</Text>
                    <Text style={styles.subtitle}>Connect with others on their financial journey</Text>
                </View>

                {/* Category Filter Pills */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                    contentContainerStyle={styles.categoriesContent}
                >
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryPill,
                                selectedCategory === category.id && styles.categoryPillActive,
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.id && styles.categoryTextActive,
                                ]}
                            >
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Posts */}
                <View style={styles.postsContainer}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <TouchableOpacity key={post.id} style={styles.postCard}>
                                {/* User Info */}
                                <View style={styles.postHeader}>
                                    <View style={styles.avatar} />
                                    <View style={styles.postHeaderText}>
                                        <View style={styles.titleRow}>
                                            <Text style={styles.postTitle} numberOfLines={1}>
                                                {post.title}
                                            </Text>
                                            <View style={[styles.categoryBadge, { backgroundColor: post.categoryColor }]}>
                                                <Text style={styles.categoryBadgeText}>{post.category}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.postMeta}>
                                            {post.username} · {post.timeAgo}
                                        </Text>
                                    </View>
                                </View>

                                {/* Post Content */}
                                <Text style={styles.postContent} numberOfLines={2}>
                                    {post.content}
                                </Text>

                                {/* Engagement Metrics */}
                                <View style={styles.postFooter}>
                                    <View style={styles.engagementItem}>
                                        <MaterialIcons name="chat-bubble-outline" size={moderateScale(18)} color={COLORS.textSecondary} />
                                        <Text style={styles.engagementText}>{post.comments}</Text>
                                    </View>
                                    <View style={styles.engagementItem}>
                                        <MaterialIcons name="favorite-border" size={moderateScale(18)} color={COLORS.textSecondary} />
                                        <Text style={styles.engagementText}>{post.likes}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.engagementItem}>
                                        <MaterialIcons name="share" size={moderateScale(18)} color={COLORS.textSecondary} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>No posts in this category yet</Text>
                            <Text style={styles.emptyStateSubtext}>Check back later or try another category</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        padding: scale(20),
        paddingBottom: verticalScale(120),
    },
    header: {
        marginBottom: verticalScale(20),
    },
    title: {
        fontSize: moderateScale(28),
        fontFamily: 'Poppins-Bold',
        color: COLORS.yellow,
        marginBottom: verticalScale(4),
    },
    subtitle: {
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        color: COLORS.textSecondary,
    },
    categoriesContainer: {
        marginBottom: verticalScale(20),
        maxHeight: verticalScale(40),
    },
    categoriesContent: {
        paddingRight: scale(20),
    },
    categoryPill: {
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(8),
        borderRadius: moderateScale(20),
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.textSecondary,
        marginRight: scale(8),
        height: verticalScale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryPillActive: {
        backgroundColor: COLORS.yellow,
        borderColor: COLORS.yellow,
    },
    categoryText: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        fontFamily: 'Poppins-Medium',
    },
    categoryTextActive: {
        color: COLORS.background,
        fontFamily: 'Poppins-SemiBold',
    },
    postsContainer: {
        gap: verticalScale(16),
    },
    postCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: moderateScale(16),
        padding: scale(16),
        marginBottom: verticalScale(16),
    },
    postHeader: {
        flexDirection: 'row',
        marginBottom: verticalScale(12),
    },
    avatar: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: COLORS.textSecondary,
        marginRight: scale(12),
    },
    postHeaderText: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(4),
        gap: scale(8),
    },
    postTitle: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.text,
        flex: 1,
    },
    categoryBadge: {
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        borderRadius: moderateScale(12),
    },
    categoryBadgeText: {
        fontSize: moderateScale(10),
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.background,
    },
    postMeta: {
        fontSize: moderateScale(12),
        fontFamily: 'Poppins-Regular',
        color: COLORS.textSecondary,
    },
    postContent: {
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        color: COLORS.text,
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(12),
    },
    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(16),
    },
    engagementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(4),
    },
    engagementText: {
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        color: COLORS.textSecondary,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(60),
    },
    emptyStateText: {
        fontSize: moderateScale(18),
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.text,
        marginBottom: verticalScale(8),
    },
    emptyStateSubtext: {
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        color: COLORS.textSecondary,
    },
});

export default Community;