import React from 'react';
import { observer, inject } from "mobx-react";
import { List, ListItem, Navbar, NavRight, Page, Icon, Link } from 'framework7-react';
import { useTranslation } from 'react-i18next';
import { Device } from "../../utils/device";

const CollaborationPage = inject('storeAppOptions', 'users', 'storeDocumentInfo')(observer(props => {
    const { t } = useTranslation();
    const _t = t('Common.Collaboration', {returnObjects: true});
    const appOptions = props.storeAppOptions;
    const documentInfo = props.storeDocumentInfo;
    const dataDoc = documentInfo && documentInfo.dataDoc;
    const fileType = dataDoc && dataDoc.fileType;
    const sharingSettingsUrl = appOptions.sharingSettingsUrl;
    const isViewer = appOptions.isViewer;

    return (
        <Page name="collab__main">
            <Navbar title={_t.textCollaboration}>
                {Device.phone &&
                    <NavRight>
                        <Link sheetClose=".coauth__sheet">
                            <Icon icon='icon-expand-down'/>
                        </Link>
                    </NavRight>
                }
            </Navbar>
            <List>
                {(sharingSettingsUrl && fileType !== 'oform') &&
                    <ListItem title={t('Common.Collaboration.textSharingSettings')} link="/sharing-settings/">
                        <Icon slot="media" icon="icon-sharing-settings"></Icon>
                    </ListItem>
                }
                {props.users.editUsers.length > 0 &&
                    <ListItem link={'/users/'} title={_t.textUsers}>
                        <Icon slot="media" icon="icon-users"></Icon>
                    </ListItem>
                }
                {appOptions.canViewComments &&
                    <ListItem link='/comments/' title={_t.textComments}>
                        <Icon slot="media" icon="icon-insert-comment"></Icon>
                    </ListItem>
                }
                {(window.editorType === 'de' && (appOptions.canReview || appOptions.canViewReview) && !isViewer) &&
                    <ListItem link={'/review/'} title={_t.textReview}>
                        <Icon slot="media" icon="icon-review"></Icon>
                    </ListItem>
                }
            </List>
        </Page>
    )
}));

export default CollaborationPage;