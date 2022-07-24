import BinaryTreeNode from '../BinaryTreeNode';

export default class BinarySearchTreeNode extends BinaryTreeNode {
  insert(value) {
    if (this.value === null) {
      this.value = value;
      return this;
    }

    if (value < this.value) {
      // Insert to the left.
      if (this.left) {
        this.left.insert(value);
      } else {
        this.setLeft(new BinarySearchTreeNode(value));
      }
    } else if (value > this.value) {
      // Insert to the right.
      if (this.right) {
        this.right.insert(value);
      } else {
        this.setRight(new BinarySearchTreeNode(value));
      }
    }

    return this;
  }

  find(value) {
    // Check the root.
    if (this.value === value) {
      return this;
    }

    if (value < this.value && this.left) {
      // Check left nodes.
      return this.left.find(value);
    } else if (value > this.value && this.right) {
      // Check right nodes.
      return this.right.find(value);
    }

    return null;
  }

  contains(value) {
    return !!this.find(value);
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error('Item not found in the tree');
    }

    const { parent } = nodeToRemove;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Node is a leaf and thus has no children.
      // Just remove the pointer to this node from the parent node.
      parent.removeChild(nodeToRemove);
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Node has two children.
      // Find the next biggest value (minimum value in the right branch)
      // and replace current value node with that next biggest value.
      const nextBiggerNode = nodeToRemove.right.findMin();
      if (nextBiggerNode !== nodeToRemove.right) {
        this.remove(nextBiggerNode.value);
        nodeToRemove.value = nextBiggerNode.value;
      } else {
        // In case if next right value is the next bigger one and it doesn't have left child
        // then just replace node that is going to be deleted with the right node.
        nodeToRemove.value = nodeToRemove.right.value;
        nodeToRemove.right = nodeToRemove.right.right;
      }
    } else {
      // Node has only one child.
      // Make this child to be a direct child of current node's parent.
      if (nodeToRemove.left) {
        parent.replaceChild(nodeToRemove, nodeToRemove.left);
      } else {
        parent.replaceChild(nodeToRemove, nodeToRemove.right);
      }
    }
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}
