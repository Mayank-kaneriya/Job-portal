import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    })
    setFilterCompany(filteredCompany);


  }, [companies, searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>
          A List Of Your Registered Companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>LOGO</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead className='text-right'>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            filterCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage className='h-10 w-10' src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell >
                  {company.name}
                </TableCell>
                <TableCell>
                  {company.createdAt.split('T')[0]}
                </TableCell>
                <TableCell className='text-right cursor-pointer'>
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className='w-32'>
                      <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-4 w-fit cursor-pointer' >
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>

                    </PopoverContent>
                  </Popover>
                </TableCell>

              </TableRow>
            ))
          }

        </TableBody>
      </Table>

    </div>
  )
}

export default CompaniesTable
