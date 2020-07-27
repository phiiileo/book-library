FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageCrop
);

FilePond.setOptions({
    stylePanelAspectRatio: 100 / 50,
    imageResizeTargetWidth: 50,
    imageResizeTargetHeight: 100,
})

FilePond.parse(document.body)