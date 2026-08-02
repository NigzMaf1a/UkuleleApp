import React, { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import CustomerReportItem from '../../../sections/CustomerReportItem';
import DispText from '../../../components/DispText';
import FancyLoad from '../../../sections/FancyLoad';

//interfaces
import Services from '../../../scripts/interfaces/services';

//scripts
import Customer from '../../../scripts/classes/customer';

//auth
import storage from '../../../scripts/auth/storage';

export default function CustomerReports() {
    const [services, setServices] = useState<Services[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showRecent, setShowRecent] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useFocusEffect(useCallback(() => {
        let timeout: ReturnType<typeof setTimeout>;

        async function initialize() {
            try {
                setLoading(true);
                const [id, key] = await Promise.all([
                    storage.get.profile().then(prof => prof?.RegID),
                    storage.get.key()
                ]);

                if (typeof id === 'number' && typeof key === 'string') {
                    const customer = new Customer(id, key);
                    const s = await customer.getCustomerServices();

                    setServices(s);

                    setShowRecent(services.length > 0);

                    timeout = setTimeout(
                        () => setShowRecent(false),
                        3000
                    );

                } else {
                    setServices([]);
                    setShowRecent(false);
                }
            } catch (error) {
                console.log('Error occurred while initializing reports');
                console.log(error);
                setServices([]);
            } finally {
                setLoading(false);
            }
        }

        initialize();

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, []));


    const queriedReports = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) return services;

        return services.filter((service) =>
            Object.values(service).some((value) =>
                String(value).toLowerCase().includes(query)
            )
        );
    }, [services, searchQuery]);

    return (
        <ScrollScreen
            showSearch
            query={searchQuery}
            setQuery={setSearchQuery}
            searchPlaceholder='Search reports....'
        >
            <FancyLoad loading={loading} />
            {
                queriedReports.length > 0 ? queriedReports.map(
                    (s) => <CustomerReportItem
                        key={s.serviceid}
                        service={s}
                    />
                ) :
                    <DispText
                        text='No service records found'
                        textAlign='center'
                        textColor='info'
                    />
            }
        </ScrollScreen>
    );
}