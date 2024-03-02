// Modal.js

import React from 'react';
import { View, Modal, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose, onConfirm, inputValue, setInputValue }) => {
  const handleConfirm = () => {
    onConfirm(inputValue); // OnConfirm fonksiyonunu çağırırken inputValue'yi iletiyoruz
  };

  const handleCancel = () => {
    onClose();
    setInputValue('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter value"
            onChangeText={(text) => setInputValue(text)  }
            value={inputValue}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomModal;
