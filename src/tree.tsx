import AutoResizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import TreeItem from "./treeItem";

export interface Item {
    path: string;
    name: string;
    type: "directory" | "file";
    parent?: string;
}

export interface TreeNode extends Item {
    name: string;
    path: string;
    isCollapsed: boolean;
    haveFailure: boolean;
    passing: boolean;
    isExecuting: boolean;
    hierarchy: number;
}

interface Props {
    results: TreeNode[];
    selectedNodeId: string;
    onFileSelection: (path: string) => void;
    onToggle: (path: string, isCollapsed: boolean) => void;
}

export default function Tree({
    results,
    selectedNodeId,
    onFileSelection,
    onToggle
}: Props) {
    return (
        <AutoResizer>
            {({ height, width }: any) => {
                return (
                    <List
                        height={height - 90}
                        itemCount={results.length}
                        itemSize={20}
                        width={width}
                    >
                        {({ index, style }: any) => (
                            <TreeItem
                                style={style}
                                key={results[index].path}
                                item={results[index]}
                                selectedFile={selectedNodeId}
                                setSelectedFile={onFileSelection}
                                onToggle={onToggle}
                            />
                        )}
                    </List>
                );
            }}
        </AutoResizer>
    );
}