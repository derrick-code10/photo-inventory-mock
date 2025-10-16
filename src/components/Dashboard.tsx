import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { InventoryGrid } from './InventoryGrid';
import { InventoryDetails } from './InventoryDetails';
import { AddItemModal } from './AddItemModal';
import { 
  Search, 
  Plus, 
  LogOut, 
  Camera, 
  Grid3x3, 
  List, 
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DashboardProps {
  onLogout: () => void;
}

export interface InventoryItem {
  id: string;
  itemName: string;
  quantity: number;
  tags: string[];
  status: 'available' | 'in-use' | 'archived';
  storageLocation: string;
  lastUpdated: string;
  updatedBy: string;
}

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    itemName: 'Ink-1A2B',
    quantity: 3,
    tags: ['ink'],
    status: 'available',
    storageLocation: 'Ink shelf',
    lastUpdated: '2000-01-01',
    updatedBy: 'TA 2'
  },
  {
    id: '2',
    itemName: 'WD40',
    quantity: 234,
    tags: ['chemical'],
    status: 'archived',
    storageLocation: 'Closet',
    lastUpdated: '2032-06-12',
    updatedBy: 'MrBeast'
  },
  {
    id: '3',
    itemName: 'Fixer-55',
    quantity: 2,
    tags: ['chemical'],
    status: 'archived',
    storageLocation: 'Dark Room',
    lastUpdated: '2004-12-23',
    updatedBy: 'Jesse Pinkman'
  },
  {
    id: '4',
    itemName: 'Canon DSLR',
    quantity: 1,
    tags: ['Camera'],
    status: 'in-use',
    storageLocation: 'Myles House',
    lastUpdated: '2004-12-23',
    updatedBy: 'Gru (admin)'
  },
];

export function Dashboard({ onLogout }: DashboardProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddItem = (newItem: InventoryItem) => {
    setInventory([newItem, ...inventory]);
  };

  const filteredInventory = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h1>Photography Inventory</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-sm text-gray-600">Total Items</div>
            <div className="text-2xl mt-2">{inventory.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-sm text-gray-600">Expired</div>
            <div className="text-2xl mt-2">
              {new Set(inventory.flatMap(i => i.tags)).size}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-sm text-gray-600">In Use</div>
            <div className="text-2xl mt-2">
              {new Set(inventory.map(i => i.storageLocation)).size}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-sm text-gray-600">Out Of Stock</div>
            <div className="text-2xl mt-2">
              {inventory.reduce((sum, i) => sum + i.quantity, 0)}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, category, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Items ({inventory.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <InventoryGrid
              items={filteredInventory}
              viewMode={viewMode}
              onSelectItem={setSelectedItem}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Details Panel */}
      {selectedItem && (
        <InventoryDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}
