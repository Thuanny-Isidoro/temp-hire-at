
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Dummy company data
const initialCompanies = [
  {
    id: '1',
    name: 'Seven Technologies',
    industry: 'Software Development',
    location: 'London, UK',
    size: '51-200',
    website: 'https://seventechnologies.cloud',
    openPositions: 12,
    logo: '/placeholder.svg',
    status: 'active',
  },
  {
    id: '2',
    name: 'Digital Minds Inc.',
    industry: 'AI & Machine Learning',
    location: 'Berlin, Germany',
    size: '201-1000',
    website: 'https://digitalminds-example.com',
    openPositions: 8,
    logo: '/placeholder.svg',
    status: 'active',
  },
  {
    id: '3',
    name: 'Cloud Systems Ltd',
    industry: 'Cybersecurity',
    location: 'Madrid, Spain',
    size: '11-50',
    website: 'https://cloudsystems-example.com',
    openPositions: 3,
    logo: '/placeholder.svg',
    status: 'inactive',
  },
];

const AdminCompanies = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    size: '',
    website: '',
    description: '',
    logo: '/placeholder.svg',
    status: 'active',
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = () => {
    const newCompany = {
      id: Date.now().toString(),
      name: formData.name,
      industry: formData.industry,
      location: formData.location,
      size: formData.size,
      website: formData.website,
      description: formData.description,
      logo: formData.logo,
      status: formData.status,
      openPositions: 0,
    };
    
    setCompanies([...companies, newCompany]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: 'Company Added',
      description: `${newCompany.name} has been added to the system.`,
    });
  };

  const handleEditCompany = () => {
    if (!currentCompany) return;
    
    const updatedCompanies = companies.map(company => {
      if (company.id === currentCompany.id) {
        return {
          ...company,
          name: formData.name,
          industry: formData.industry,
          location: formData.location,
          size: formData.size,
          website: formData.website,
          description: formData.description,
          logo: formData.logo,
          status: formData.status,
        };
      }
      return company;
    });
    
    setCompanies(updatedCompanies);
    setIsEditDialogOpen(false);
    resetForm();
    
    toast({
      title: 'Company Updated',
      description: `${formData.name} has been updated.`,
    });
  };

  const handleDeleteCompany = () => {
    if (!currentCompany) return;
    
    const updatedCompanies = companies.filter(
      company => company.id !== currentCompany.id
    );
    
    setCompanies(updatedCompanies);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: 'Company Removed',
      description: `${currentCompany.name} has been removed from the system.`,
    });
  };

  const prepareEditDialog = (company: any) => {
    setCurrentCompany(company);
    setFormData({
      name: company.name,
      industry: company.industry,
      location: company.location,
      size: company.size,
      website: company.website,
      description: company.description || '',
      logo: company.logo,
      status: company.status,
    });
    setIsEditDialogOpen(true);
  };

  const prepareDeleteDialog = (company: any) => {
    setCurrentCompany(company);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      industry: '',
      location: '',
      size: '',
      website: '',
      description: '',
      logo: '/placeholder.svg',
      status: 'active',
    });
    setCurrentCompany(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Companies</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Size</TableHead>
              <TableHead className="hidden md:table-cell">Open Positions</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No companies found
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                        <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                      </div>
                      {company.name}
                    </div>
                  </TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell className="hidden md:table-cell">{company.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{company.size}</TableCell>
                  <TableCell className="hidden md:table-cell">{company.openPositions}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {company.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => prepareEditDialog(company)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => prepareDeleteDialog(company)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" /> View Company
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Company Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Add a new company to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Seven Technologies"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <select 
                id="industry" 
                name="industry" 
                value={formData.industry}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select industry</option>
                <option value="Software Development">Software Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. London, UK"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">Company Size</Label>
              <select 
                id="size" 
                name="size" 
                value={formData.size}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" 
                name="website" 
                value={formData.website}
                onChange={handleInputChange}
                placeholder="e.g. https://company.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter company description..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status" 
                name="status" 
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCompany}>Add Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Company Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update company information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Company Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-industry">Industry</Label>
              <select 
                id="edit-industry" 
                name="industry" 
                value={formData.industry}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select industry</option>
                <option value="Software Development">Software Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="FinTech">FinTech</option>
                <option value="HealthTech">HealthTech</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input 
                id="edit-location" 
                name="location" 
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-size">Company Size</Label>
              <select 
                id="edit-size" 
                name="size" 
                value={formData.size}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-website">Website</Label>
              <Input 
                id="edit-website" 
                name="website" 
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Company Description</Label>
              <Textarea 
                id="edit-description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <select 
                id="edit-status" 
                name="status" 
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCompany}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this company? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentCompany && (
            <div className="py-4">
              <p><strong>Company Name:</strong> {currentCompany.name}</p>
              <p><strong>Open Positions:</strong> {currentCompany.openPositions}</p>
            </div>
          )}
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCompany}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCompanies;
