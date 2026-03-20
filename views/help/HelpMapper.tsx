import React, {useEffect} from 'react';

//components
import ScrollScreen from '../../components/ScrollScreen';
import { HelpHead, HelpListItem } from './HelpComponents';
import DashTray from '../../sections/DashTray';

//enums
import RegType from '../../scripts/enums/regType';

//text
import * as nav from './helpNavigation';
import * as actions from './helpActions';

function AccountantHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.accountantNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.accountantActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function InspectorHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.inspectorNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.inspectorActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function CustomerHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.customerNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.customerActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function BandHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.bandNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.bandActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function DjHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.djNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.djActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function MceeHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.mceeNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.mceeActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function StoreHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.storeNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.storeActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function DispatchHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.dispatchNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.dispatchActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

function SupplierHelp(){
    return (
        <ScrollScreen>
            <HelpHead text='Navigation'/>
            <DashTray>
                {
                    nav.supplierNavigationInfo.map((i) => <HelpListItem text={i}/>)
                }
            </DashTray>

            <HelpHead text='Actions'/>
            <DashTray>
                {
                    actions.supplierActionInfo.map((a) => <HelpListItem text={a}/>)
                }
            </DashTray>
        </ScrollScreen>
    );
}

interface MapperProps{
    regtype:RegType;
}

export default function HelpMapper({ regtype }:MapperProps){
    switch(regtype){
        case RegType.Accountant:
            return <AccountantHelp/>
        case RegType.Band:
            return <BandHelp/>
        case RegType.Customer:
            return <CustomerHelp/>
        case RegType.DJ:
            return <DjHelp/>
        case RegType.Dispatchman:
            return <DispatchHelp/>
        case RegType.Inspector:
            return <InspectorHelp/>
        case RegType.Mcee:
            return <MceeHelp/>
        case RegType.Storeman:
            return <StoreHelp/>
        case RegType.Supplier:
            return <SupplierHelp/>
    }
}
