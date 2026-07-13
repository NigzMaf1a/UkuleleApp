import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//components
import FormStrip from '../components/FormStript';
import DispText from '../components/DispText';

//navigation
import { AuthStackParamList } from '../navigation/AuthStack';

//styles
import { colors } from '../styles/colors';

type ViewType = 'login' | 'register';

interface Log {
    text: string;
    linker: string;
    target: ViewType;
}

interface RegLogRedirectorProps {
    view: ViewType;
}

type AuthNavProp = NativeStackNavigationProp<AuthStackParamList>;

function dataSource(view: ViewType): Log {
    switch (view) {
        case 'login':
            return {
                text: "Don't have an account?",
                linker: 'Register',
                target: 'register'
            };
        case 'register':
            return {
                text: 'Already have an account?',
                linker: 'Login',
                target: 'login'
            };
    }
}

export default function RegLogRedirector({ view }: RegLogRedirectorProps) {
    const navigation = useNavigation<AuthNavProp>();
    const data = useMemo(() => dataSource(view), [view]);

    const handleRedirect = () => {
        navigation.navigate(data.target === 'register' ? 'Register' : 'Login');
    };

    return (
        <FormStrip>
            <DispText text={data.text} variant="caption" textColor={colors.textSecondary} />
            <DispText
                text={data.linker}
                variant="caption"
                textColor={colors.primary}
                onClick={handleRedirect}
            />
        </FormStrip>
    );
}
