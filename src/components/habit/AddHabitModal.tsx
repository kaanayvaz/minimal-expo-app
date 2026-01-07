import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/spacing';
import { TYPOGRAPHY } from '../../constants/typography';

interface AddHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, icon: string, color: string) => void;
}

const ICONS = ['💧', '🏃', '📖', '🧘', '💪', '🥗', '😴', '🎯', '✍️', '🎨', '🎵', '💼'];
const COLORS_PALETTE = [
  '#3B82F6', // Blue
  '#22C55E', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

export default function AddHabitModal({ visible, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🎯');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim(), selectedIcon, selectedColor);
      // Reset form
      setName('');
      setSelectedIcon('🎯');
      setSelectedColor('#3B82F6');
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form on close
    setName('');
    setSelectedIcon('🎯');
    setSelectedColor('#3B82F6');
    onClose();
  };

  return (
    <Modal visible={visible} onClose={handleClose} title="Yeni Alışkanlık Oluştur">
      <View style={styles.container}>
        {/* Alışkanlık Adı */}
        <View style={styles.section}>
          <Text style={styles.label}>Alışkanlık Adı</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Örn: Günde 2L Su İç"
            autoFocus
          />
        </View>

        {/* İkon Seçimi */}
        <View style={styles.section}>
          <Text style={styles.label}>Simge Seç</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.iconContainer}
          >
            {ICONS.map((icon) => (
              <TouchableOpacity
                key={icon}
                style={[
                  styles.iconButton,
                  selectedIcon === icon && styles.iconButtonSelected,
                ]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Text style={styles.iconText}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Renk Seçimi */}
        <View style={styles.section}>
          <Text style={styles.label}>Renk Seç</Text>
          <View style={styles.colorContainer}>
            {COLORS_PALETTE.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorButtonSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Önizleme */}
        <View style={styles.section}>
          <Text style={styles.label}>Önizleme</Text>
          <View style={[styles.preview, { borderColor: selectedColor }]}>
            <Text style={styles.previewIcon}>{selectedIcon}</Text>
            <Text style={styles.previewText}>{name || 'Alışkanlık adı'}</Text>
          </View>
        </View>

        {/* Butonlar */}
        <View style={styles.buttons}>
          <Button
            title="İptal"
            onPress={handleClose}
            variant="secondary"
            style={styles.button}
          />
          <Button
            title="Oluştur"
            onPress={handleAdd}
            disabled={!name.trim()}
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    paddingVertical: SPACING.xs,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  iconText: {
    fontSize: 28,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  colorButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: COLORS.text.primary,
  },
  checkmark: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.background.secondary,
    borderWidth: 2,
  },
  previewIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  previewText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  button: {
    flex: 1,
  },
});
