import { SubmitHandler, useForm } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    EditorShellForm,
    EditorShellInline,
    FormInput,
    FormInputProjects,
    FormInputText,
} from 'buzzingpixel-mission-control-frontend-core';
import { MonitoredUrl } from './MonitoredUrls';
import AddMonitoredUrlFormValues from './AddMonitoredUrlFormValues';
import { useEditMonitoredUrlMutation } from './MonitoredUrlData';

const ProjectListItemEditor = (
    {
        item,
        setEditorIsOpen,
    }: {
        item: MonitoredUrl;
        setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
    },
) => {
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

    const [
        isSaving,
        setIsSaving,
    ] = useState<boolean>(false);

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
            setValue,
        },
    ] as Array<FormInput>;

    const [
        errorMessage,
        setErrorMessage,
    ] = useState<string>('');

    const mutation = useEditMonitoredUrlMutation(
        item.id,
    );

    const saveHandler: SubmitHandler<AddMonitoredUrlFormValues> = (
        data,
    ) => {
        setIsSaving(true);

        if (errorMessage) {
            setErrorMessage('');
        }

        mutation.mutate(data, {
            onSuccess: () => setEditorIsOpen(false),
            onError: (error) => {
                setErrorMessage(error.message || 'Unable to edit monitored URL');

                setIsSaving(false);
            },
        });
    };

    return (
        <div style={{ paddingBottom: '1.5rem' }}>
            <div
                className="border border-gray-300 rounded-md shadow-md mx-auto p-4"
                style={{ maxWidth: '600px' }}
            >
                <EditorShellInline
                    isSaving={isSaving}
                    setEditorIsOpen={setEditorIsOpen}
                    errorMessage={errorMessage}
                    saveHandler={() => {
                        saveHandler(getValues());
                    }}
                >
                    <EditorShellForm
                        inputs={inputs}
                        register={register}
                        onSubmit={() => {
                            saveHandler(getValues());
                        }}
                    />
                </EditorShellInline>
            </div>
        </div>
    );
};

export default ProjectListItemEditor;
