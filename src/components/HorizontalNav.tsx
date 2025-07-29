import React from 'react';
import {
    autoUpdate,
    offset,
    FloatingFocusManager,
    useClick,
    useFloating,
    useInteractions,
    useDismiss,
} from '@floating-ui/react';
import {
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaCloseTiny,
    VisaMenuLow,
} from '@visa/nova-icons-react';
import {
    Button,
    Divider,
    DropdownButton,
    DropdownMenu,
    Link,
    Listbox,
    ListboxItem,
    Nav,
    NavAppName,
    Tab,
    TabSuffix,
    Tabs,
    Typography,
    Utility,
    UtilityFragment,
    VisaLogo,
} from '@visa/nova-react';
import { CSSProperties, useState } from 'react';

// TIP: Customize this ID, pass it as a prop, or auto-generate it with useId() from @react
const id = 'UIDevAssist-horizontal-nav';

const label3SubItems = [
    {
        tabLabel: 'Saved Query Name 1',
        id: `${id}-label-3-sub-item-0`,
        href: './horizontal-navigation',
    },
    {
        tabLabel: 'Saved Query Name 2',
        id: `${id}-label-3-sub-item-1`,
        href: './horizontal-navigation',
    },
];

export const DefaultHorizontalNav = () => {
    const [mobileLabel3MenuOpen, setMobileLabel3MenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [label3Open, setLabel3Open] = useState(false);

    // For dropdown menus in the horizontal nav, we use floating UI for
    // -opening
    // -positioning
    // -dismissing

    // floating-ui setup for the account dropdown



    // floating-ui setup for the label3 tab dropdown
    const {
        context: label3FloatingContext,
        floatingStyles: label3FloatingStyles,
        refs: label3FloatingRefs,
    } = useFloating({
        middleware: [offset(8)],
        open: label3Open,
        onOpenChange: setLabel3Open,
        placement: 'bottom-start',
        whileElementsMounted: autoUpdate,
    });

    const clickLabel3Ref = useClick(label3FloatingContext);
    const dismissLabel3Menu = useDismiss(label3FloatingContext);
    const { getReferenceProps: getLabel3ReferenceProps, getFloatingProps: getLabel3FloatingProps } = useInteractions([
        clickLabel3Ref,
        dismissLabel3Menu,
    ]);

    const onToggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div>
            <Link skipLink href="#content">
                Skip to content
            </Link>
            <UtilityFragment vJustifyContent="between">
                <Nav id={id} orientation="horizontal" tag="header">
                    <UtilityFragment vContainerHide="desktop">
                        <DropdownButton
                            aria-controls={`${id}-mobile-menu`}
                            aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                            aria-label="open menu"
                            aria-describedby={`${id}-mobile-menu-notifications-badge`}
                            buttonSize="large"
                            colorScheme="tertiary"
                            iconButton
                            id={`${id}-mobile-menu-button`}
                            onClick={onToggleMobileMenu}
                        >
                            {mobileMenuOpen ? (
                                <VisaCloseTiny />
                            ) : (
                                <VisaMenuLow />
                            )}
                        </DropdownButton>
                    </UtilityFragment>
                    <UtilityFragment vFlex vGap={16}>
                        <Link
                            aria-label="Visa UI Development Assistant"
                            href="./horizontal-navigation"
                            id={`${id}-home-link`}
                            noUnderline
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <VisaLogo />
                            <NavAppName>
                                <Utility
                                    // vContainerHide="xs"
                                    element={<Typography variant="headline-3">UI Developement Assistant</Typography>}
                                />
                            </NavAppName>
                        </Link>
                    </UtilityFragment>
                    <UtilityFragment vFlex vJustifyContent="end" vFlexGrow vMarginLeft="auto" vContainerHide="mobile">
                        <nav aria-label="Label for horizontal default example">
                            <UtilityFragment vGap={4}>
                                <Tabs>

                                    <Tab>
                                        <DropdownButton
                                            aria-expanded={label3Open}
                                            aria-controls={label3Open ? `${id}-label-dropdown-menu` : undefined}
                                            id={`${id}-label-dropdown-button`}
                                            buttonSize="large"
                                            colorScheme="tertiary"
                                            ref={label3FloatingRefs.setReference}
                                            {...getLabel3ReferenceProps()}
                                        >
                                            Saved Queries
                                            <TabSuffix element={label3Open ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                                        </DropdownButton>

                                        {label3Open && (
                                            <FloatingFocusManager
                                                context={label3FloatingContext}
                                                modal={false}
                                                initialFocus={-1}
                                                restoreFocus={true}
                                            >
                                                <DropdownMenu
                                                    id={`${id}-label-dropdown-menu`}
                                                    aria-hidden={!label3Open}
                                                    style={
                                                        {
                                                            inlineSize: '180px',
                                                            position: 'absolute',
                                                            ...label3FloatingStyles,
                                                            zIndex: 1,
                                                        } as CSSProperties
                                                    }
                                                    ref={label3FloatingRefs.setFloating}
                                                    {...getLabel3FloatingProps()}
                                                >
                                                    <Listbox>
                                                        {label3SubItems.map(label3SubItem => (
                                                            <li key={label3SubItem.id}>
                                                                <UtilityFragment vPaddingVertical={4} vPaddingHorizontal={8}>
                                                                    <ListboxItem href={label3SubItem.href} tag="a">
                                                                        {label3SubItem.tabLabel}
                                                                    </ListboxItem>
                                                                </UtilityFragment>
                                                            </li>
                                                        ))}
                                                    </Listbox>
                                                </DropdownMenu>
                                            </FloatingFocusManager>
                                        )}
                                    </Tab>

                                    <Tab>
                                        <Button
                                            buttonSize="large"
                                            colorScheme="tertiary"
                                            element={<a href="https://design.visa.com/">Visa Product Design System</a>}
                                        />
                                    </Tab>
                                </Tabs>
                            </UtilityFragment>
                        </nav>
                    </UtilityFragment>



                </Nav>
            </UtilityFragment>
            <UtilityFragment vContainerHide="desktop" vHide={!mobileMenuOpen}>
                <Nav
                    aria-label="Label for horizontal default example"
                    aria-hidden={!mobileMenuOpen}
                    id={`${id}-mobile-menu`}
                    orientation="vertical"
                >
                    <Tabs orientation="vertical">
                        {/* TODO Save and Load Stretch Goal
                            Update this code to contain Load feature for every saved query */}

                        <Tab>
                            <Button
                                aria-expanded={mobileLabel3MenuOpen}
                                aria-controls={mobileLabel3MenuOpen ? `${id}-account-sub-menu` : 'undefined'}
                                id={`${id}-mobile-menu-label-dropdown-button`}
                                buttonSize="large"
                                colorScheme="tertiary"
                                onClick={() => setMobileLabel3MenuOpen(!mobileLabel3MenuOpen)}
                            >
                                Saved Queries
                                <TabSuffix element={mobileLabel3MenuOpen ? <VisaChevronUpTiny /> : <VisaChevronDownTiny />} />
                            </Button>

                            {mobileLabel3MenuOpen && (
                                <Tabs orientation="vertical" id={`${id}-account-sub-menu`}>
                                    {label3SubItems.map(label3SubItem => (
                                        <Tab key={label3SubItem.id} id={label3SubItem.id}>
                                            <Button
                                                colorScheme="tertiary"
                                                element={<a href={label3SubItem.href}>{label3SubItem.tabLabel}</a>}
                                            />
                                        </Tab>
                                    ))}
                                </Tabs>
                            )}
                        </Tab>
                        <Divider dividerType="decorative"></Divider>
                        <Tab>
                            <Button
                                buttonSize="large"
                                colorScheme="tertiary"
                                element={<a href="https://design.visa.com/">Visa Product Design System</a>}
                            />
                        </Tab>
                    </Tabs>
                </Nav>
            </UtilityFragment>
        </div>
    );
};