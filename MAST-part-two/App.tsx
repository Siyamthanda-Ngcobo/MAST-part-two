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
