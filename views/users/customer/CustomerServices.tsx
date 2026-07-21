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
      const id = await storage.get.profile().then(prof => prof?.RegID);
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
    const hrs = stringToNumber(hours);

    if (hrs === null) {
      return 0;
    }

    if (val === ServiceType.Booking) {
      return ChargeRates.Booking * genreChargesExtractor(gen) * hrs;
    }

    return ChargeRates.Lending * genreChargesExtractor(gen) * hrs;
  }

  function calculateCost(gen: Genre) {
    let subTotal = 0;

    if (genre !== null && hours !== null && serviceType !== null) {

      const hrs = stringToNumber(hours);

      if (hrs === null) {
        setTotal(0);
        return;
      }

      if (serviceType === ServiceType.Booking) {

        if (hrs > 3) {
          toaster('A band live booking cannot exceed three hours', 'info');
          setHours('3');
          return;
        }

        subTotal = costCalculator(serviceType, gen);
      } else {
        subTotal = costCalculator(serviceType as ServiceType, gen);
      }

      setTotal(subTotal);
    }
  }

  useEffect(() => {
    calculateCost(genre as Genre);
  }, [genre, serviceType, hours]);

  function request(): Services {

    const hrs = stringToNumber(hours);

    if (hrs === null) {
      throw new Error('Invalid hours');
    }

    console.log({
      customerId,
      genre,
      hours,
      serviceType,
      total,
    });

    return {
      customerid: customerId,
      genre: genre as Genre,
      cost: total,
      hours: hrs,
      servicetype: serviceType as ServiceType,
      servicestatus: serviceStatus,
      paymentstatus: paymentStatus
    };
  }

  async function sendRequest() {
    console.log("1. Button pressed");

    if (customer) {
      console.log("2. Customer exists");

      toaster('Requesting.......', 'info');

      console.log("3. Before request()");

      const req = request();

      console.log("4. Request object:", req);

      await customer.requestService(req);
      setHours('');
      setGenre('');
      setServiceType('');

      console.log("5. After API call");

      setTimeout(() => {
        toaster('Service request successful', 'success');
      }, 3000);
    } else {
      console.log("Customer is undefined");
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