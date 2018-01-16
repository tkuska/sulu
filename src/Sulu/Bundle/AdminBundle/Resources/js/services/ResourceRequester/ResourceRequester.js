// @flow
import Requester from '../Requester';
import resourceMetadataStore from '../../stores/ResourceMetadataStore';
import type {ListOptions} from './types';

export default class ResourceRequester {
    static buildQueryString(queryOptions: ?Object) {
        const options = queryOptions;
        if (!options) {
            return '';
        }

        const searchParameters = new URLSearchParams();
        Object.keys(options).forEach((key) => {
            if (options[key] === undefined) {
                return;
            }

            searchParameters.set(key, options[key]);
        });

        return '?' + searchParameters.toString().replace(/%2C/gi, ',');
    }

    static get(resourceKey: string, id: number | string, queryOptions: ?Object) {
        const baseUrl = resourceMetadataStore.getBaseUrl(resourceKey);
        return Requester.get(baseUrl + '/' + id + ResourceRequester.buildQueryString(queryOptions));
    }

    static post(resourceKey: string, data: Object, queryOptions: ?Object) {
        const baseUrl = resourceMetadataStore.getBaseUrl(resourceKey);
        return Requester.post(baseUrl + ResourceRequester.buildQueryString(queryOptions), data);
    }

    static put(resourceKey: string, id: number | string, data: Object, queryOptions: ?Object) {
        const baseUrl = resourceMetadataStore.getBaseUrl(resourceKey);
        return Requester.put(baseUrl + '/' + id + ResourceRequester.buildQueryString(queryOptions), data);
    }

    static getList(resourceKey: string, options: ListOptions) {
        const baseUrl = resourceMetadataStore.getBaseUrl(resourceKey);
        const queryOptions = {...options, flat: true};

        return Requester.get(baseUrl + ResourceRequester.buildQueryString(queryOptions));
    }

    static delete(resourceKey: string, id: number | string) {
        const baseUrl = resourceMetadataStore.getBaseUrl(resourceKey);
        return Requester.delete(baseUrl + '/' + id);
    }
}
