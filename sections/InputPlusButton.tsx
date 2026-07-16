import React from 'react';
import { View } from 'react-native';

//components
import Button from '../components/Button';
import Input from '../components/Input';

//styles
import { cardStyles } from '../styles/cardStyles';

interface InputPlusButtonProps {
    inputPlaceholder: string;
    inputPlaceholderTextColor?: string;
    inputValue: string;
    onInputChange: (par: string) => void;
    btnLabel: string;
    btnFun: (par: string) => Promise<void> | void;
}

export default function InputPlusButton({
    inputPlaceholderTextColor,
    inputValue,
    inputPlaceholder,
    onInputChange,
    btnLabel,
    btnFun
}: InputPlusButtonProps) {

    return (
        <View style={cardStyles.input_plus_btn}>

            <Input
                placeholder={inputPlaceholder}
                value={inputValue}
                onChange={onInputChange}
            />

            <Button
                label={btnLabel}
                fun={() => btnFun(inputValue)}
                variant='primary'
            />
        </View>
    );
}