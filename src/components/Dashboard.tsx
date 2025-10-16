import { useState } from 'react';
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
  title: string;
  category: string;
  date: string;
  location: string;
  equipment: string;
  status: 'available' | 'in-use' | 'archived';
  tags: string[];
  notes: string;
}

const initialInventory: InventoryItem[] = [
  {
    id: '1',
    title: 'Landscape Series - Mountain Vista',
    category: 'Landscape',
    date: '2024-09-15',
    location: 'Rocky Mountains, CO',
    equipment: 'Canon EOS R5, 24-70mm f/2.8',
    status: 'available',
    tags: ['mountains', 'nature', 'golden-hour'],
    notes: 'Shot during sunset, excellent lighting conditions'
  },
  {
    id: '2',
    title: 'Portrait Study - Natural Light',
    category: 'Portrait',
    date: '2024-10-01',
    location: 'Studio A',
    equipment: 'Sony A7III, 85mm f/1.4',
    status: 'in-use',
    tags: ['portrait', 'natural-light', 'studio'],
    notes: 'Using window light, reflector on left'
  },
  {
    id: '3',
    title: 'Urban Architecture - Downtown',
    category: 'Architecture',
    date: '2024-08-22',
    location: 'Chicago, IL',
    equipment: 'Nikon Z7, 14-24mm f/2.8',
    status: 'available',
    tags: ['architecture', 'urban', 'black-white'],
    notes: 'Wide angle perspective study'
  },
  {
    id: '4',
    title: 'Macro Photography - Botanical',
    category: 'Macro',
    date: '2024-09-30',
    location: 'Campus Greenhouse',
    equipment: 'Canon EOS R5, 100mm f/2.8 Macro',
    status: 'available',
    tags: ['macro', 'botanical', 'close-up'],
    notes: 'Focus stacking technique used'
  },
  {
    id: '5',
    title: 'Street Photography - Market Day',
    category: 'Street',
    date: '2024-10-10',
    location: 'Local Farmers Market',
    equipment: 'Fujifilm X-T4, 35mm f/2',
    status: 'archived',
    tags: ['street', 'documentary', 'people'],
    notes: 'Candid shots, natural moments'
  },
  {
    id: '6',
    title: 'Wildlife Series - Bird Migration',
    category: 'Wildlife',
    date: '2024-09-05',
    location: 'State Park',
    equipment: 'Canon EOS R6, 100-400mm f/5.6',
    status: 'available',
    tags: ['wildlife', 'birds', 'nature'],
    notes: 'Early morning shoot, fast shutter speed'
  }
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
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                <p className="text-sm text-gray-600">Professor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
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
            <div className="text-sm text-gray-600">Available</div>
            <div className="text-2xl mt-2">
              {inventory.filter(i => i.status === 'available').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-sm text-gray-600">In Use</div>
            <div className="text-2xl mt-2">
              {inventory.filter(i => i.status === 'in-use').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-sm text-gray-600">Archived</div>
            <div className="text-2xl mt-2">
              {inventory.filter(i => i.status === 'archived').length}
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
            <TabsTrigger value="available">
              Available ({inventory.filter(i => i.status === 'available').length})
            </TabsTrigger>
            <TabsTrigger value="in-use">
              In Use ({inventory.filter(i => i.status === 'in-use').length})
            </TabsTrigger>
            <TabsTrigger value="archived">
              Archived ({inventory.filter(i => i.status === 'archived').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <InventoryGrid
              items={filteredInventory}
              viewMode={viewMode}
              onSelectItem={setSelectedItem}
            />
          </TabsContent>
          <TabsContent value="available">
            <InventoryGrid
              items={filteredInventory.filter(i => i.status === 'available')}
              viewMode={viewMode}
              onSelectItem={setSelectedItem}
            />
          </TabsContent>
          <TabsContent value="in-use">
            <InventoryGrid
              items={filteredInventory.filter(i => i.status === 'in-use')}
              viewMode={viewMode}
              onSelectItem={setSelectedItem}
            />
          </TabsContent>
          <TabsContent value="archived">
            <InventoryGrid
              items={filteredInventory.filter(i => i.status === 'archived')}
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
