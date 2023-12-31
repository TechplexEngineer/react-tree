import { memo } from "react";
import styled from "styled-components";
import {
    File,
    Folder,
    ChevronRight,
    ChevronDown,
} from 'react-bootstrap-icons';
import { TreeNode } from "./tree";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Content = styled.div<any>`
  display: flex;
  align-items: center;
  padding: 2.5px;
  cursor: pointer;
  color: ${(props) =>
        props.failed ? "#FE5339" : props.passing ? "#19E28D" : null};
  background-color: ${(props) => (props.selected ? "#444444" : null)};
  border-radius: 3px;
  margin-bottom: 2px;
  font-weight: 600;

  &:hover {
    background-color: #444444;
  }
`;

const Label = styled.div`
  margin-left: 5px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EmptyChevron = <div style={{ width: "5px" }}></div>
// styled.div`
//   width: 5px;
// `;



interface Props {
    item: TreeNode;
    style: any;
    selectedFile: string;
    setSelectedFile: (path: string) => void;
    onToggle: (path: string, isCollapsed: boolean) => void;
}

function TreeItem({
    item,
    selectedFile,
    setSelectedFile,
    onToggle,
    style,
}: Props) {
    const Icon =
        item.type === "directory" ? Folder : File;
    let Chevron: any = EmptyChevron;
    if (item.type === "directory") {
        Chevron = item.isCollapsed ? ChevronRight : ChevronDown;
    }

    const handleClick = () => {
        if (item.type === "file") {
            setSelectedFile(item.path);
        }

        if (item.type === "directory") {
            onToggle(item.path, !item.isCollapsed);
        }
    };

    return (
        <Container
            style={{
                ...style,
                width: "90%",
                marginLeft: `${(item.hierarchy + 1) * 15}px`,
            }}
        >
            <Content
                hierarchy={item.hierarchy}
                passing={item.passing}
                failed={item.haveFailure}
                selected={selectedFile === item.path}
                onClick={handleClick}
            >
                <Chevron size={11} />
                <Icon size={11} />

                <Label>{item.name}</Label>
            </Content>
        </Container>
    );
}

export default memo(TreeItem, (pre: Props, next: Props) => {
    return (
        pre.item.isExecuting === next.item.isExecuting &&
        pre.item.isCollapsed === next.item.isCollapsed &&
        pre.selectedFile === next.selectedFile
    );
});
