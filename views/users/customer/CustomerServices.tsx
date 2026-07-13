import React, { useState, useEffect } from 'react';

//components
import ScrollScreen from '../../../components/ScrollScreen';
import BigForm from '../../../components/BigForm';
import LabelledInput from '../../../sections/LabelledInput';
import LabelledDropdown from '../../../components/LabelledDropdown';
import LabelledText from '../../../components/LabelledText';

//interfaces
import Services from '../../../scripts/interfaces/services';
import { DropDownItem } from '../../../components/DropDown';
import Finance from '../../../scripts/interfaces/finance';

//enums
import { Genre, ServiceType, ServiceStatus, PaymentStatus } from '../../../scripts/enums/services';
import { Status } from '../../../scripts/interfaces/finance';

//scripts
import Customer from '../../../scripts/classes/customer';
import { genreDropDownValues, serviceTypeDropDownValues } from '../../../scripts/utils/services';
import stringToNumber from '../../../scripts/utils/stringToNumber';
import { Charges, ChargeRates } from '../../../scripts/utils/charges';
import errorLogger from '../../../scripts/utils/errorLogger';
import toaster from '../../../scripts/utils/toaster';
import date from '../../../scripts/utils/date';

//data
import hoursDropDownValues from '../../../scripts/utils/hours';

//auth
import storage from '../../../scripts/auth/storage';
import Button from '../../../components/Button';

export default function CustomerServices() {
  const [customer, setCustomer] = useState<Customer>();
  const [customerId, setCustomerId] = useState<number>(0);
  const [genre, setGenre] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [serviceStatus] = useState<ServiceStatus>(ServiceStatus.Pending);
  const [paymentStatus] = useState<PaymentStatus>(PaymentStatus.NotPaid);
  const [bookingHours] = useState<DropDownItem[]>(hoursDropDownValues);
  const [genres] = useState<DropDownItem[]>(genreDropDownValues());
  const [services] = useState<DropDownItem[]>(serviceTypeDropDownValues());
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const id = await storage.get.profile().then(prof => prof?.regID);
      const key = await storage.get.key().then(key => key);
      if (typeof id === 'number' && typeof key === 'string') {
        const cust = new Customer(id, key);

        setCustomer(cust);
        setCustomerId(id);
      }
    })();
  }, []);

  function genreChargesExtractor(genre: Genre): number {
    if (genre === null) {
      toaster('Please select a genre', 'warn');
    }
    switch (genre) {
      case Genre.Benga:
        return Charges.Benga;
      case Genre.Reggae:
        return Charges.Reggae;
      case Genre.Rhumba:
        return Charges.Rhumba;
      case Genre.RnB:
        return Charges.RnB;
      case Genre.Soul:
        return Charges.Soul;
      case Genre.Zilizopendwa:
        return Charges.Zilizopendwa;
    }
  }

  function costCalculator(val: ServiceType, gen: Genre): number {
    let cost: number = 0;
    if (val === ServiceType.Booking) {
      cost = ChargeRates.Booking * genreChargesExtractor(gen) * stringToNumber(hours);
      return cost;
    } else {
      cost = ChargeRates.Lending * genreChargesExtractor(gen) * stringToNumber(hours);
      return cost;
    }
  }

  function calculateCost(gen: Genre) {
    let subTotal: number = 0;
    if (genre !== null && hours !== null && serviceType !== null) {
      if (serviceType === ServiceType.Booking) {
        if (stringToNumber(hours) > 3) {
          toaster('A band live booking cannot exceed three hours', 'info');
          setHours('3');
        }
        subTotal = costCalculator(serviceType, gen);
        setTotal(subTotal);
      } else {
        subTotal = costCalculator(serviceType as ServiceType, gen);
        setTotal(subTotal);
      }
    }
  }

  useEffect(() => {
    calculateCost(genre as Genre);
  }, [genre, serviceType, hours]);

  function request(): Services {
    return {
      CustomerID: customerId,
      Genre: genre as Genre,
      Cost: total,
      Hours: stringToNumber(hours),
      ServiceType: serviceType as ServiceType,
      ServiceStatus: serviceStatus,
      PaymentStatus: paymentStatus
    }
  }

  async function sendRequest() {
    if (customer) {
      toaster('Requesting.......', 'info');
      await customer.requestService(request());
      setTimeout(() => {
        toaster('Service request successful', 'success');
      }, 3000);
    }
  }

  return (
    <ScrollScreen>
      <BigForm>
        <LabelledDropdown
          label='Select Service Type'
          values={services}
          selectedValue={serviceType}
          onValueChange={setServiceType}
        />

        <LabelledDropdown
          label='Select Genre'
          values={genres}
          selectedValue={genre}
          onValueChange={setGenre}
        />

        <LabelledDropdown
          label='Hours'
          values={bookingHours}
          selectedValue={hours}
          onValueChange={setHours}
        />

        <LabelledText
          label='Total'
          text={String(total)}
        />

        <Button
          label='Request'
          fun={async () => await sendRequest()}
        />

      </BigForm>
    </ScrollScreen>
  );
}