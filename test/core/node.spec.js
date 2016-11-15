'use strict';

import {
    expect
} from 'chai/chai';
import {
    Scene
} from '../../src/core/scene';
import {
    BBox
} from '../../src/core/bbox';
import {
    matrix_to_array
} from '../../src/utils/helper';
import {
    trim_angle
} from '../../src/utils/math';

describe('Node tests', () => {
    const scene = new Scene();
    const Node = scene.factory().Node;

    describe('Node behavior', () => {
        let node;

        beforeEach(function() {
            node = new Node();
        });

        it('Constructs correctly', () => {
            expect(node.parent()).to.be.equal(null);
            expect(node.children().length).to.be.equal(0);
            expect(node.pivot().x).to.be.equal(0);
            expect(node.pivot().y).to.be.equal(0);
            expect(node.translate().x).to.be.equal(0);
            expect(node.translate().y).to.be.equal(0);
            expect(node.rotate()).to.be.equal(0);
            expect(node.scale().x).to.be.equal(1);
            expect(node.scale().y).to.be.equal(1);
            expect(node.active()).to.be.equal(true);
            expect(node.dirty()).to.be.equal(false);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('100010001');
            expect(matrix_to_array(node.matrixCascaded()).join('')).to.be.equal('100010001');
        });

        it('Sets nodes pivot point', () => {
            expect(node.pivot(50, 60)).to.be.equal(node);
            expect(node.pivot().x).to.be.equal(50);
            expect(node.pivot().y).to.be.equal(60);
        });

        it('Resets transformations', () => {
            expect(node.dirty()).to.be.equal(false);
            expect(node.pivot().x).to.be.equal(0);
            expect(node.pivot().y).to.be.equal(0);
            expect(node.translate(5, 0)).to.be.equal(node);
            expect(node.rotate(45)).to.be.equal(node);
            expect(node.scale(1.5, 2)).to.be.equal(node);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('1.06065821647644041.06066215038299560-1.4142161607742311.41421091556549070501');
            expect(node.reset()).to.be.equal(node);
            expect(node.translate().x).to.be.equal(0);
            expect(node.translate().y).to.be.equal(0);
            expect(node.rotate()).to.be.equal(0);
            expect(node.scale().x).to.be.equal(1);
            expect(node.scale().y).to.be.equal(1);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('100010001');
            expect(node.dirty()).to.be.equal(true);
        });

        it('Sets translation', () => {
            expect(node.dirty()).to.be.equal(false);
            expect(node.translate(5, 0)).to.be.equal(node);
            expect(node.translate().x).to.be.equal(5);
            expect(node.translate().y).to.be.equal(0);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('100010501');
            expect(node.translate(5, 10)).to.be.equal(node);
            expect(node.translate().x).to.be.equal(5);
            expect(node.translate().y).to.be.equal(10);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('1000105-101');
            expect(node.dirty()).to.be.equal(true);
        });

        it('Sets rotation', () => {
            expect(node.dirty()).to.be.equal(false);
            expect(node.rotate(0)).to.be.equal(node);
            expect(node.rotate()).to.be.equal(0);
            expect(node.rotate(45)).to.be.equal(node);
            expect(node.rotate()).to.be.equal(45);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('0.70710545778274540.70710808038711550-0.70710808038711550.70710545778274540001');
            expect(node.rotate(45)).to.be.equal(node);
            expect(node.rotate()).to.be.equal(45);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('0.70710545778274540.70710808038711550-0.70710808038711550.70710545778274540001');
            expect(node.dirty()).to.be.equal(true);
        });

        it('Sets scale', () => {
            expect(node.dirty()).to.be.equal(false);
            expect(node.scale(1.5, 2)).to.be.equal(node);
            expect(node.scale().x).to.be.equal(1.5);
            expect(node.scale().y).to.be.equal(2);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('1.500020001');
            expect(node.scale(1.5, 2)).to.be.equal(node);
            expect(node.scale().x).to.be.approximately(1.5, 0.1);
            expect(node.scale().y).to.be.equal(2);
            expect(matrix_to_array(node.matrixOwn()).join('')).to.be.equal('1.500020001');
            expect(node.dirty()).to.be.equal(true);
        });

        it('Sets dirtiness status', () => {
            expect(node.dirty()).to.be.equal(false);
            expect(node.dirty(true)).to.be.equal(node);
            expect(node.dirty()).to.be.equal(true);
        });

        it('Sets activeness status', () => {
            expect(node.active()).to.be.equal(true);
            expect(node.active(false)).to.be.equal(node);
            expect(node.active()).to.be.equal(false);
        });
    });

    describe('Hierarchy', () => {
        let nodeA;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Sets dirtiness indicator correctly while appending children one by one', () => {
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeC.dirty()).to.be.equal(true);
        });

        it('Sets dirtiness indicator correctly while appending multiple children', () => {
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(nodeA.append(nodeB, nodeC)).to.be.equal(nodeA);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeC.dirty()).to.be.equal(true);
        });

        it('Appends children one by one', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.children()[0]).to.be.equal(nodeB);
            expect(nodeA.children()[nodeA.children().length - 1]).to.be.equal(nodeB);
            expect(nodeA.children().length).to.be.equal(1);
            expect(nodeB.children()[0]).to.be.equal(nodeC);
            expect(nodeB.children()[nodeB.children().length - 1]).to.be.equal(nodeC);
            expect(nodeB.children().length).to.be.equal(1);
        });

        it('Appends multiple children', () => {
            expect(nodeA.append(nodeB, nodeC)).to.be.equal(nodeA);
            expect(nodeA.children()[0]).to.be.equal(nodeB);
            expect(nodeA.children()[nodeA.children().length - 1]).to.be.equal(nodeC);
            expect(nodeA.children().length).to.be.equal(2);
        });

        it('Sets parent node correctly', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.parent()).to.be.equal(nodeA);
            expect(nodeC.parent()).to.be.equal(nodeB);
        });

        it('Checks if the given node is equal to it, linked to it or not', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.has(nodeA)).to.be.equal(true);
            expect(nodeA.has(nodeB)).to.be.equal(true);
            expect(nodeA.has(nodeC)).to.be.equal(true);
            expect(nodeB.has(nodeA)).to.be.equal(false);
            expect(nodeB.has(nodeB)).to.be.equal(true);
            expect(nodeB.has(nodeC)).to.be.equal(true);
            expect(nodeC.has(nodeA)).to.be.equal(false);
            expect(nodeC.has(nodeB)).to.be.equal(false);
            expect(nodeC.has(nodeC)).to.be.equal(true);
        });

        it('Checks if the given node is equal to it, has it as amongst its child nodes or not', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.linked(nodeA)).to.be.equal(true);
            expect(nodeA.linked(nodeB)).to.be.equal(false);
            expect(nodeA.linked(nodeC)).to.be.equal(false);
            expect(nodeB.linked(nodeA)).to.be.equal(true);
            expect(nodeB.linked(nodeB)).to.be.equal(true);
            expect(nodeB.linked(nodeC)).to.be.equal(false);
            expect(nodeC.linked(nodeA)).to.be.equal(true);
            expect(nodeC.linked(nodeB)).to.be.equal(true);
            expect(nodeC.linked(nodeC)).to.be.equal(true);
        });

        it('Unlinks children correctly', () => {
            expect(nodeA.append(nodeB, nodeC)).to.be.equal(nodeA);
            expect(nodeA.children().length).to.be.equal(2);
            expect(nodeA.filicide()).to.be.equal(nodeA);
            expect(nodeA.children().length).to.be.equal(0);
        });
    });

    describe('Reaching dirty nodes', () => {
        let nodeA;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Reaches only the node given when it is dirty', () => {
            expect(nodeA.translate(10, 20)).to.be.equal(nodeA);
            expect(nodeA.dirty()).to.be.equal(true);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.dirty()).to.be.equal(true);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeC.dirty()).to.be.equal(true);
            let dirtyNodesSelection = nodeA.reachDirty();
            expect(dirtyNodesSelection.length).to.be.equal(1);
            expect(dirtyNodesSelection[0].translate().x).to.be.equal(10);
            expect(dirtyNodesSelection[0].translate().y).to.be.equal(20);
        });

        it('Reaches only the closest dirty node when the nodes are chained', () => {
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeB.translate(10, 20)).to.be.equal(nodeB);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeC.dirty()).to.be.equal(true);
            let dirtyNodesSelection = nodeA.reachDirty();
            expect(dirtyNodesSelection.length).to.be.equal(1);
            expect(dirtyNodesSelection[0].translate().x).to.be.equal(10);
            expect(dirtyNodesSelection[0].translate().y).to.be.equal(20);
        });

        it('Reaches all of closest dirty node when they are siblings', () => {
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(nodeA.append(nodeB, nodeC)).to.be.equal(nodeA);
            expect(nodeB.translate(10, 20)).to.be.equal(nodeB);
            expect(nodeC.translate(30, 40)).to.be.equal(nodeC);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeC.dirty()).to.be.equal(true);
            let dirtyNodesSelection = nodeA.reachDirty();
            expect(dirtyNodesSelection.length).to.be.equal(2);
            expect(dirtyNodesSelection[0].translate().x).to.be.equal(10);
            expect(dirtyNodesSelection[0].translate().y).to.be.equal(20);
            expect(dirtyNodesSelection[dirtyNodesSelection.length - 1].translate().x).to.be.equal(30);
            expect(dirtyNodesSelection[dirtyNodesSelection.length - 1].translate().y).to.be.equal(40);
        });
    });

    describe('Transformation cascading', () => {
        let nodeA;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Clears the dirty flag while cascading', () => {
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeC.dirty()).to.be.equal(true);
            expect(nodeA.cascade()).to.be.equal(nodeA);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
        });

        it('Cascades transformations correctly when only the root of the hierarchy node transformed', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.translate(1, 1)).to.be.equal(nodeA);
            expect(nodeB.translate(2, 2)).to.be.equal(nodeB);
            expect(nodeC.translate(3, 3)).to.be.equal(nodeC);
            expect(nodeA.dirty()).to.be.equal(true);
            expect(nodeB.dirty()).to.be.equal(true);
            expect(nodeC.dirty()).to.be.equal(true);
            expect(nodeA.cascade()).to.be.equal(nodeA);
            expect(nodeA.dirty()).to.be.equal(false);
            expect(nodeB.dirty()).to.be.equal(false);
            expect(nodeC.dirty()).to.be.equal(false);
            expect(matrix_to_array(nodeA.matrixOwn()).join('')).to.be.equal('1000101-11');
            expect(matrix_to_array(nodeA.matrixCascaded()).join('')).to.be.equal('1000101-11');
            expect(matrix_to_array(nodeB.matrixOwn()).join('')).to.be.equal('1000102-21');
            expect(matrix_to_array(nodeB.matrixCascaded()).join('')).to.be.equal('1000103-31');
            expect(matrix_to_array(nodeC.matrixOwn()).join('')).to.be.equal('1000103-31');
            expect(matrix_to_array(nodeC.matrixCascaded()).join('')).to.be.equal('1000106-61');
        });
    });

    describe('Calculation of bounding boxes', () => {
        let nodeA;
        let nodeB;
        let nodeC;

        beforeEach(function() {
            nodeA = new Node();
            nodeB = new Node();
            nodeC = new Node();
        });

        it('Calculates its own bounding box correctly', () => {
            expect(nodeA._bbox().x()).to.be.equal(0);
            expect(nodeA._bbox().y()).to.be.equal(0);
            expect(nodeA._bbox().width()).to.be.equal(0);
            expect(nodeA._bbox().height()).to.be.equal(0);
        });

        it('Calculates the cascaded bound box correctly', () => {
            expect(nodeA.bbox().x()).to.be.equal(0);
            expect(nodeA.bbox().y()).to.be.equal(0);
            expect(nodeA.bbox().width()).to.be.equal(0);
            expect(nodeA.bbox().height()).to.be.equal(0);
        });

        it('Calculates the cascaded bound box correctly when there are several children present', () => {
            expect(nodeA.append(nodeB)).to.be.equal(nodeA);
            expect(nodeB.append(nodeC)).to.be.equal(nodeB);
            expect(nodeA.bbox().x()).to.be.equal(0);
            expect(nodeA.bbox().y()).to.be.equal(0);
            expect(nodeA.bbox().width()).to.be.equal(0);
            expect(nodeA.bbox().height()).to.be.equal(0);
        });
    });
});
