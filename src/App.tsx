import './App.css'
import Tree, { TreeNode } from './tree';



function App() {

  const handleFileToggle = (path: string, isCollapsed: boolean) => {
    console.log(`handleFileToggle: ${path} ${isCollapsed}`);
  };

  const tn: TreeNode = {
    name: "string",
    path: "string",
    isCollapsed: false,
    haveFailure: false,
    passing: false,
    isExecuting: false,
    hierarchy: 0,
    type: "directory"
  }

  let files: TreeNode[] = [
  ];
  for (let i = 0; i <= 100; i++) {
    const t = Object.assign({}, tn);
    t.name = `string${i}`
    t.hierarchy = i;
    files.push(t);
  }


  const handleFileSelection = (path: string) => {
    console.log(`handleFileSelection: ${path}`);
  };

  const selectedFile = "";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Tree
        results={files}
        selectedNodeId={selectedFile}
        onFileSelection={handleFileSelection}
        onToggle={handleFileToggle}
      />
    </div>
  )
}

export default App
