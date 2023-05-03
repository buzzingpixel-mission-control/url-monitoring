import React, { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    EditorShellFloating, EditorShellForm,
    FormInput, FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import AddMonitoredUrlFormValues from '../AddMonitoredUrlFormValues';
import { useEditMonitoredUrlMutation } from '../MonitoredUrlData';
import { MonitoredUrl } from '../MonitoredUrls';

const EditMonitoredUrlOverlay = (
    {
        item,
        setIsOpen,
    }: {
        item: MonitoredUrl;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
    const [
        isSaving,
        setIsSaving,
    ] = useState<boolean>(false);

    const {
        getValues,
        register,
        setValue,
    } = useForm<AddMonitoredUrlFormValues>({
        defaultValues: {
            title: item.title,
            url: item.url,
            project_id: item.projectId,
        },
    });

    const inputs = [
        {
            title: 'Title',
            name: 'title',
            placeholder: 'Example Site',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'Url',
            name: 'url',
            placeholder: 'example-site.com',
            required: true,
            renderInput: FormInputText,
            setValue,
        },
        {
            title: 'Project',
            name: 'project_id',
            renderInput: FormInputProjects,
            initialValue: item.projectId,
            setValue,
        },
    ] as Array<FormInput>;

    const [
        errorMessage,
        setErrorMessage,
    ] = useState<string>('');

    const mutation = useEditMonitoredUrlMutation(
        item.id,
        item.slug,
    );

    const saveHandler: SubmitHandler<AddMonitoredUrlFormValues> = (
        data,
    ) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setIsOpen(false),
            onError: (error) => {
                setErrorMessage(error.message || 'Unable to add monitored url');

                setIsSaving(false);
            },
        });
    };

    return (
        <EditorShellFloating
            title="Add New Monitored URL"
            isSaving={isSaving}
            submitButtonText="Submit"
            errorMessage={errorMessage}
            saveHandler={() => {
                saveHandler(getValues());
            }}
            setEditorIsOpen={setIsOpen}
        >
            <EditorShellForm
                inputs={inputs}
                register={register}
                onSubmit={() => {
                    saveHandler(getValues());
                }}
            />
        </EditorShellFloating>
    );
};

export default EditMonitoredUrlOverlay;
