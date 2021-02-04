import React, {Fragment, useState} from 'react';
import {observer, inject} from "mobx-react";
import {f7, Page, Navbar, List, ListItem, Row, BlockTitle, Link, Toggle, Icon, View, NavRight, ListItemCell, Range, Button, Segmented, Tab, Tabs, ListInput, ListButton} from 'framework7-react';
import { ThemeColorPalette, CustomColorPicker } from '../../../../../common/mobile/lib/component/ThemeColorPalette.jsx';
import { useTranslation } from 'react-i18next';
import {Device} from '../../../../../common/mobile/utils/device';

const EditImage = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});

    return (
        <Fragment>
            <List>
                <ListItem title={_t.textReplace} link="/edit-replace-image/" routeProps={{
                    onReplaceByFile: props.onReplaceByFile,
                    onReplaceByUrl: props.onReplaceByUrl
                }}></ListItem>
                <ListItem title={_t.textReorder} link="/edit-reorder-image/" routeProps={{
                    onReorder: props.onReorder
                }}></ListItem>
            </List>
            <List className="buttons-list">
                <ListItem href="#" className="button button-raised button-fill" onClick={props.onDefaultSize}>{_t.textActualSize}</ListItem>
                <ListItem href="#" className="button button-raised button-red" onClick={props.onRemoveImage}>{_t.textRemoveImage}</ListItem>
            </List>
        </Fragment>
    )
};

const PageReorder = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});

    return (
        <Page>
            <Navbar title={_t.textReorder} backLink={_t.textBack} />
            <List>
                <ListItem title={_t.textBringToForeground} link='#' onClick={() => {props.onReorder('all-up')}} className='no-indicator'>
                    <Icon slot="media" icon="icon-move-foreground"></Icon>
                </ListItem>
                <ListItem title={_t.textSendToBackground} link='#' onClick={() => {props.onReorder('all-down')}} className='no-indicator'>
                    <Icon slot="media" icon="icon-move-background"></Icon>
                </ListItem>
                <ListItem title={_t.textMoveForward} link='#' onClick={() => {props.onReorder('move-up')}} className='no-indicator'>
                    <Icon slot="media" icon="icon-move-forward"></Icon>
                </ListItem>
                <ListItem title={_t.textMoveBackward} link='#' onClick={() => {props.onReorder('move-down')}} className='no-indicator'>
                    <Icon slot="media" icon="icon-move-backward"></Icon>
                </ListItem>
            </List>
        </Page>
    )
};


const PageReplace = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});

    return (
        <Page className="images">
            <Navbar title={_t.textReplace} backLink={_t.textBack} />
            <List>
                <ListItem title={_t.textPictureFromLibrary} onClick={() => {props.onReplaceByFile()}}>
                    <Icon slot="media" icon="icon-image-library"></Icon>
                </ListItem>
                <ListItem title={_t.textPictureFromURL} link='/edit-image-link/' routeProps={{
                    onReplaceByUrl: props.onReplaceByUrl
                }}>
                    <Icon slot="media" icon="icon-link"></Icon>
                </ListItem>
            </List>
        </Page>
    )
};

const PageLinkSettings = props => {
    const { t } = useTranslation();
    const _t = t('View.Edit', {returnObjects: true});
    const [stateValue, setValue] = useState('');

    const onReplace = () => {
        if (stateValue.trim().length > 0) {
            if ((/((^https?)|(^ftp)):\/\/.+/i.test(stateValue))) {
                props.onReplaceByUrl(stateValue.trim());
            } else {
                f7.dialog.alert(_t.textNotUrl, _t.notcriticalErrorTitle);
            }
        } else {
            f7.dialog.alert(_t.textEmptyImgUrl, _t.notcriticalErrorTitle);
        }
    };
    return (
        <Page>
            <Navbar title={_t.textLinkSettings} backLink={_t.textBack} />
            <BlockTitle>{_t.textAddress}</BlockTitle>
            <List>
                <ListInput
                    type='text'
                    placeholder={_t.textImageURL}
                    value={stateValue}
                    onChange={(event) => {setValue(event.target.value)}}
                >
                </ListInput>
            </List>
            <List>
                <ListButton className={'button-fill button-raised' + (stateValue.length < 1 ? ' disabled' : '')} title={_t.textReplaceImage} onClick={() => {onReplace()}}></ListButton>
            </List>
        </Page>
    )
};

const EditImageContainer = inject("storeFocusObjects")(observer(EditImage));
const PageReplaceContainer = inject("storeFocusObjects")(observer(PageReplace));
const PageReorderContainer = inject("storeFocusObjects")(observer(PageReorder));
const PageLinkSettingsContainer = inject("storeFocusObjects")(observer(PageLinkSettings));

export {
    EditImageContainer as EditImage,
    PageReplaceContainer as PageImageReplace,
    PageReorderContainer as PageImageReorder,
    PageLinkSettingsContainer as PageLinkSettings
}