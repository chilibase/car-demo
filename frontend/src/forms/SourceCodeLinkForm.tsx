export const SourceCodeLinkForm = (props: {sourceCodeFile: string}) => {
    return (
        <div className="flex justify-content-center mt-3">
            <a className="source-code-link" href={`https://github.com/michalrakus/car-demo/blob/master/frontend/src/forms/${props.sourceCodeFile}`} target="_blank" rel="noopener noreferrer">Source code form: {props.sourceCodeFile}</a>
        </div>
    );
}
