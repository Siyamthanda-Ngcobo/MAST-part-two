import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView,StyleSheet, Text, TextInput, TouchableOpacity,View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const COURSES: Course[] = ['Starter', 'Main Course', 'Dessert'];

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addMenuItem = () => {
    Keyboard.dismiss();
    setError('');
    setSuccess('');

    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();
    const numericPrice = Number(trimmedPrice);

    
    if (!trimmedName || !trimmedDescription || !course || !trimmedPrice) {
      setError('Please complete all fields before adding the dish.');
      return;
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError('Enter a valid price greater than R0.00.');
      return;
    }

     const newItem: MenuItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: trimmedName,
      description: trimmedDescription,
      course,
      price: numericPrice,
    };

    setMenuItems((currentItems) => [...currentItems, newItem]);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setSuccess(`${trimmedName} was added to the menu successfully.`);
  };

   return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>RESTAURANT MANAGEMENT</Text>
            <Text style={styles.headerTitle}>Chef's Menu Manager</Text>
            <Text style={styles.headerSubtitle}>
              Add dishes and keep your restaurant menu organised.
            </Text>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {menuItems.length} {menuItems.length === 1 ? 'dish' : 'dishes'} on menu
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Add a menu item</Text>
            <Text style={styles.sectionSubtitle}>
              Enter the details of the dish below.
            </Text>

            {error !== '' && (
              <View accessibilityRole="alert" style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {success !== '' && (
              <View accessibilityRole="alert" style={styles.successBox}>
                <Text style={styles.successText}>{success}</Text>
              </View>
            )}

            <Text style={styles.label}>Dish name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Creamy mushroom soup"
              placeholderTextColor="#94A3B8"
              value={dishName}
              onChangeText={(value) => {
                setDishName(value);
                setError('');
                setSuccess('');
              }}
              maxLength={80}
              returnKeyType="next"
              accessibilityLabel="Dish name"
            />

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Describe the ingredients or dish"
              placeholderTextColor="#94A3B8"
              value={description}
              onChangeText={(value) => {
                setDescription(value);
                setError('');
                setSuccess('');
              }}
              multiline
              textAlignVertical="top"
              maxLength={250}
              accessibilityLabel="Dish description"
            />

            <Text style={styles.label}>Course *</Text>
            <View style={styles.courseOptions}>
              {COURSES.map((item) => {
                const selected = course === item;
                return (
                  <TouchableOpacity
                    key={item}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    style={[
                      styles.courseButton,
                      selected && styles.courseButtonSelected,
                    ]}
                    onPress={() => {
                      setCourse(item);
                      setError('');
                      setSuccess('');
                    }}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.courseButtonText,
                        selected && styles.courseButtonTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Price (R) *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 89.99"
              placeholderTextColor="#94A3B8"
              value={price}
              onChangeText={(value) => {
                setPrice(value);
                setError('');
                setSuccess('');
              }}
              keyboardType="decimal-pad"
              maxLength={10}
              accessibilityLabel="Dish price in rand"
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMenuItem}
              activeOpacity={0.85}
              accessibilityRole="button"
            >
              <Text style={styles.addButtonText}>+ Add to menu</Text>
            </TouchableOpacity>
            <Text style={styles.requiredNote}>* Required fields</Text>
          </View>

          <View style={styles.menuHeading}>
            <View>
              <Text style={styles.sectionTitle}>Current menu</Text>
              <Text style={styles.sectionSubtitle}>
                All dishes added during this session.
              </Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{menuItems.length}</Text>
            </View>
          </View>

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyIcon}>🍽</Text>
              <Text style={styles.emptyTitle}>Your menu is empty</Text>
              <Text style={styles.emptyText}>
                Add your first dish using the form above. It will appear here.
              </Text>
            </View>
          ) : (
            menuItems.map((item, index) => (
              <View key={item.id} style={styles.menuItemCard}>
                <View style={styles.menuItemTop}>
                  <View style={styles.dishNumber}>
                    <Text style={styles.dishNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.dishHeading}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.courseTag}>{item.course}</Text>
                  </View>
                  <Text style={styles.dishPrice}>
                    R{item.price.toFixed(2)}
                  </Text>
                </View>
                <Text style={styles.dishDescription}>{item.description}</Text>
              </View>
            ))
          )}

          <Text style={styles.footer}>
            Chef's Menu Manager • Menu items are kept while this app session is open.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

