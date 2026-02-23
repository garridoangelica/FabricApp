import {
    createWorkloadClient,
    DialogType,
    InitParams,
    NotificationToastDuration,
    NotificationType,
    ItemCreateContext,
} from '@ms-fabric/workload-client';

export async function initialize(params: InitParams) {
    const workloadClient = createWorkloadClient();
    const workloadName = process.env.WORKLOAD_NAME as string;
    const catalogItemType = workloadName + '.CatalogItem';

    workloadClient.action.onAction(async function ({ action, data }) {
        switch (action) {
            // Create a new CatalogIQ item – opens the create dialog
            case 'open.createCatalogItem': {
                const { workspaceObjectId } = data as ItemCreateContext;
                return workloadClient.dialog.open({
                    workloadName: workloadName,
                    dialogType: DialogType.IFrame,
                    route: {
                        path: `/catalog-create-dialog/${workspaceObjectId}`,
                    },
                    options: { width: 400, height: 360, hasCloseButton: false },
                });
            }

            // Open the editor in frontend-only mode (no backend required)
            case 'open.catalogFrontendOnly':
                return workloadClient.page.open({
                    workloadName: workloadName,
                    route: { path: '/catalog-frontend-only' },
                });

            // Notification action (ribbon button, etc.)
            case 'catalog.notify':
                return workloadClient.notification.open({
                    title: 'CatalogIQ',
                    notificationType: NotificationType.Success,
                    message: 'Action executed successfully',
                });

            default:
                throw new Error('Unknown worker action: ' + action);
        }
    });
}
