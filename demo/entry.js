import '../index'
import {Manager, fakeDataEngine, } from 'jahmin'

let engine = new fakeDataEngine("std");

Manager.AddEngine(engine);
Manager.Init();
